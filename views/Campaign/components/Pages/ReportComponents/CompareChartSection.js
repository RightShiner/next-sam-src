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
import { keyLabel } from './constant';
import { monitoringService } from 'services';
import toast from 'react-hot-toast';

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
  colors: ['#300086', '#e6436a'],
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
};

const pieOptions = {
  labels: ['女', '男'],
  colors: ['#EA6E75', '#3670C6'],
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -5,
      },
    },
  },
  dataLabels: {
    formatter(val, opts) {
      const name = opts.w.globals.labels[opts.seriesIndex];
      return [name, val.toFixed(1) + '%'];
    },
  },
  stroke: {
    show: false,
  },
  legend: {
    show: false,
  },
};

const CompareChartSection = ({ catType, originData, statisticData }) => {
  const [options, setOptions] = useState(areaOptions);
  const [series, setSeries] = useState([]);
  const [pieSeries, setPieSeries] = useState([]);

  const [key, setKey] = useState({
    first: 'like_count',
    second: 'comment_count',
  });
  const [chartPattern, setChartPattern] = useState('smooth');

  const imgSrc = {
    like_count: 'small_heart',
    comment_count: 'small_post',
    share: 'small_share',
    save: 'small_engage',
  };

  useEffect(() => {
    setInfoByKey('like_count', 'comment_count');
  }, [statisticData]);

  useEffect(async () => {
    let influencerId = originData?.map((data) => data?.infProfile?.userId);
    if (influencerId.length !== 0) {
      fetchData(influencerId);
    }
  }, [originData]);

  const fetchData = async (influencerId) => {
    const data = {
      catType,
      influencerId,
    };
    let res = await monitoringService.getGenderRateById(data);
    if (res.status === 'ok') {
      setPieSeries([res.data.femaleRate, res.data.maleRate]);
    } else {
      toast.error('error occurred');
    }
  };

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
      setKey((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
      if (e.target.name === 'first') setInfoByKey(e.target.value, key.second);
      if (e.target.name === 'second') setInfoByKey(key.first, e.target.value);
    },
    [key],
  );

  const setInfoByKey = (firstKey, secondKey) => {
    let newSeries = calculateData(firstKey, secondKey);
    let data = newSeries[0].data;
    let minDate = data?.[0]?.[0];
    let maxDate = data?.[(data ?? []).length - 1]?.[0];
    setOptions((prev) => ({
      ...prev,
      xaxis: {
        ...prev.xaxis,
        min: new Date(minDate).getTime(),
        max: new Date(maxDate).getTime(),
      },
    }));
    setSeries(newSeries);
  };

  const calculateData = (firstKey, secondKey) => {
    let temp = [
      { name: '', data: [] },
      { name: '', data: [] },
    ];
    let firstResult = Object.entries(statisticData).map((row) => {
      let value = row[1]?.[firstKey] ?? 0;
      row[0] = +row[0];
      row[1] = value;
      return row;
    });
    let firstSortedData = firstResult.sort((a, b) => {
      return a[0] - b[0];
    });
    temp[0].name = keyLabel[firstKey];
    temp[0].data = firstSortedData;
    let secondResult = Object.entries(statisticData).map((row) => {
      let value = row[1]?.[secondKey] ?? 0;
      row[0] = +row[0];
      row[1] = value;
      return row;
    });
    let secondSortedData = secondResult.sort((a, b) => {
      return a[0] - b[0];
    });
    temp[1].name = keyLabel[secondKey];
    temp[1].data = secondSortedData;
    return temp;
  };

  return (
    <Box display="flex" gap="12px">
      <Box p="20px" className="box" flex="1">
        <Box p="0 15px 15px" display="flex" justifyContent="space-between">
          <Box display="flex" gap="30px">
            <Box display="flex" gap="10px" alignItems="center">
              <img
                src={'/images/' + imgSrc[key.first] + '.png'}
                width="20px"
                height="20px"
                alt="smooth"
              />
              <Select
                variant="standard"
                id="demo-select-small"
                name="first"
                value={key.first}
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
            <Box display="flex" gap="10px" alignItems="center">
              <img
                src={'/images/' + imgSrc[key.second] + '.png'}
                width="20px"
                height="20px"
                alt="smooth"
              />
              <Select
                variant="standard"
                id="demo-select-small"
                name="second"
                value={key.second}
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
        <Typography className="normal_text">推定男女別リーチ</Typography>
        <Chart
          width="208"
          options={pieOptions}
          series={pieSeries}
          type="donut"
        />
      </Stack>
    </Box>
  );
};

export default CompareChartSection;
