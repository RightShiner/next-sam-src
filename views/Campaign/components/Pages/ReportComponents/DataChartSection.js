/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState, useCallback } from 'react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItem,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { avg } from 'constants/constants';
import { keyLabel } from './constant';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const areaOptions = {
  chart: {
    id: 'area-datetime',
    zoom: {
      autoScaleYaxis: true,
    },
  },
  plotOptions: {
    area: {
      fillTo: 'origin',
    },
  },
  stroke: {
    curve: 'smooth',
    width: 1,
  },
  colors: ['#300086'],
  annotations: {
    yaxis: [
      {
        strokeDashArray: 3,
        borderColor: '#319476',
        label: {
          show: true,
          text: 'avg',
          style: {
            color: '#fff',
            background: '#00E396',
          },
        },
      },
    ],
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
    style: 'hollow',
  },
  xaxis: {
    type: 'datetime',
    labels: {
      datetimeFormatter: {
        year: 'yyyy',
        month: 'MMM',
        day: 'MMM dd',
        hour: 'HH:mm',
      },
    },
  },
  tooltip: {
    x: {
      format: 'MMM dd',
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 100],
    },
  },
};

const influencerOptions = {
  theme: {
    monochrome: {
      enabled: true,
      color: '#814BC7',
    },
  },
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -5,
      },
    },
  },
  dataLabels: {
    formatter(val, opts) {
      return [val.toFixed(1) + '%'];
    },
  },
  tooltip: {},
  stroke: {
    show: false,
  },
  legend: {
    show: false,
  },
};

const DataChartSection = ({ catType, originData, statisticData }) => {
  const [options, setOptions] = useState(areaOptions);
  const [pieOptions, setPieOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [pieSeries, setPieSeries] = useState([]);

  const [influencerInfo, setInfluencerInfo] = useState([]);

  const [key, setKey] = useState('like_count');
  const [chartPattern, setChartPattern] = useState('smooth');

  const imgSrc = {
    like_count: 'small_heart',
    comment_count: 'small_post',
    share: 'small_share',
    save: 'small_engage',
  };

  useEffect(() => {
    setInfoByKey('like_count');
  }, [statisticData]);

  useEffect(() => {
    let temp = JSON.parse(JSON.stringify(originData ?? [])).map((item) => {
      let play_count = 0;
      (item?.contents ?? []).map((content) => {
        if (catType === 'instagram') {
          play_count += content?.play_count ?? 0;
        } else {
          for (let i = 0; i < content.statistics?.length; i++) {
            play_count += +(content.statistics?.[i]?.play_count ?? 0);
          }
        }
      });
      item.play_count = play_count;
      return { play_count, infProfile: item?.infProfile };
    });
    let sortedArray = temp.sort((a, b) => {
      return b.play_count - a.play_count;
    });
    let series = sortedArray?.map((val) => val?.play_count);
    setPieSeries(series);
    let members = sortedArray?.map((val) => val?.infProfile?.profile?.fullname);
    let membersInfo = sortedArray?.map((val) => val?.infProfile);
    setInfluencerInfo(membersInfo);
    setPieOptions({
      ...influencerOptions,
      labels: members,
    });
  }, [originData]);

  const handlePattern = useCallback(
    (e) => {
      setChartPattern(e.target.value);
      if (e.target.value === 'smooth') {
        setOptions((prev) => ({
          ...prev,
          stroke: {
            ...prev.stroke,
            curve: 'smooth',
          },
          plotOptions: {
            fillTo: 'origin',
          },
        }));
      }
      if (e.target.value === 'straight') {
        setOptions((prev) => ({
          ...prev,
          stroke: {
            ...prev.stroke,
            curve: 'straight',
          },
          plotOptions: {
            fillTo: 'origin',
          },
        }));
      }
      if (e.target.value === 'bar') {
        setOptions((prev) => ({
          ...prev,
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded',
            },
          },
        }));
      }
    },
    [chartPattern],
  );

  const handleKey = useCallback(
    (e) => {
      setKey(e.target.value);
      setInfoByKey(e.target.value);
    },
    [key],
  );

  const setInfoByKey = (key) => {
    let newSeries = calculateData(key);
    let data = newSeries[0].data;
    let minDate = data?.[0]?.[0];
    let maxDate = data?.[(data ?? []).length - 1]?.[0];
    let value = (data ?? []).map((item) => item[1]);
    setOptions((prev) => ({
      ...prev,
      xaxis: {
        ...prev.xaxis,
        min: new Date(minDate).getTime(),
        max: new Date(maxDate).getTime(),
      },
      annotations: {
        yaxis: [
          {
            ...prev.annotations.yaxis[0],
            y: avg(value),
          },
        ],
      },
    }));
    setSeries(newSeries);
  };

  const calculateData = (key) => {
    let temp = [{ name: '', data: [] }];
    let result = Object.entries(statisticData).map((row) => {
      let value = row[1]?.[key] ?? 0;
      row[0] = +row[0];
      row[1] = value;
      return row;
    });
    let sortedData = result.sort((a, b) => {
      return a[0] - b[0];
    });
    temp[0].data = sortedData;
    temp[0].name = keyLabel[key];
    return temp;
  };

  return (
    <Box display="flex" gap="12px">
      <Box p="20px" className="box" flex="1">
        <Box p="0 15px 15px" display="flex" justifyContent="space-between">
          <Box display="flex" gap="10px" alignItems="center">
            <img
              src={'/images/' + imgSrc[key] + '.png'}
              width="20px"
              height="20px"
              alt="smooth"
            />
            <Select
              variant="standard"
              id="demo-select-small"
              name="type"
              value={key}
              onChange={handleKey}
              disableUnderline
              sx={{
                fontSize: '14px',
              }}
            >
              <MenuItem value="like_count" sx={{ fontSize: '14px' }}>
                いいね
              </MenuItem>
              <MenuItem value="comment_count" sx={{ fontSize: '14px' }}>
                コメント
              </MenuItem>
              <MenuItem value="share" sx={{ fontSize: '14px' }}>
                シェア
              </MenuItem>
              <MenuItem value="save" sx={{ fontSize: '14px' }}>
                保存
              </MenuItem>
            </Select>
          </Box>
          <Select
            variant="standard"
            labelId="demo-select-small"
            id="demo-select-small"
            name="first"
            value={chartPattern}
            onChange={handlePattern}
            disableUnderline
            sx={{
              fontSize: '14px',
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 140,
                  width: 220,
                },
              },
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
              variant: 'menu',
            }}
          >
            <MenuItem value="smooth" sx={{ fontSize: '14px' }}>
              <ListItem sx={{ padding: 0 }}>
                <img src={'/images/curve_smooth.png'} alt="smooth" />
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: '#303030',
                    mx: '5px',
                  }}
                >
                  波線グラフ
                </Typography>
              </ListItem>
            </MenuItem>
            <MenuItem value="straight" sx={{ fontSize: '14px' }}>
              <ListItem sx={{ padding: 0 }}>
                <img src={'/images/curve_straight.png'} alt="smooth" />
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: '#303030',
                    mx: '5px',
                  }}
                >
                  折れ線グラフ
                </Typography>
              </ListItem>
            </MenuItem>
            <MenuItem value="bar" sx={{ fontSize: '14px' }}>
              <ListItem sx={{ padding: 0 }}>
                <img src={'/images/curve_bar.png'} alt="smooth" />
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: '#303030',
                    mx: '5px',
                  }}
                >
                  積み上げグラフ
                </Typography>
              </ListItem>
            </MenuItem>
          </Select>
        </Box>
        <Chart
          height="300"
          options={options}
          series={series}
          type={chartPattern === 'bar' ? 'bar' : 'area'}
        />
      </Box>
      <Stack gap={2} className="view_count box">
        <Box display="flex" gap="12px">
          <img
            src="/images/play_count.png"
            alt="play"
            width="12px"
            height="16px"
          />
          <Typography className="normal_text">再生割合</Typography>
        </Box>
        {pieSeries.every((el) => el === 0) ? (
          <Typography>データなし</Typography>
        ) : (
          <Chart
            width="208"
            options={pieOptions}
            series={pieSeries}
            type="pie"
          />
        )}
        <Stack gap={2} className="account_box">
          {influencerInfo?.map((memberInfo, i) => {
            return (
              <Stack
                key={i}
                gap="12px"
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  className="circle_symbol"
                  sx={{
                    opacity: 1 - i * 0.2 > 0.1 ? 1 - i * 0.2 : 0.1,
                  }}
                />
                <Avatar
                  alt="account"
                  src={memberInfo?.profile?.picture}
                  aria-label="recipe"
                  sx={{ width: '44px', height: '44px' }}
                />
                <Box>
                  <Typography sx={{ fontSize: '14px', color: '#303030' }}>
                    {memberInfo?.profile?.fullname}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: 'rgba(48, 48, 48, 0.5)',
                    }}
                  >
                    {'@' + memberInfo?.profile?.fullname}
                  </Typography>
                </Box>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};

export default DataChartSection;
