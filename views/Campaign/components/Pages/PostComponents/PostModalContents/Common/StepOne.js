import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Select,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TextField,
  InputAdornment,
  Stack,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import jaLocale from 'date-fns/locale/ja';
import SearchIcon from '@mui/icons-material/Search';

import { campaignService } from 'services';
import { getComparator, stableSort } from 'libs/commonFunc';
import {
  StepPageTableHead,
  StepPageTableRow,
} from 'views/Campaign/components/Table';

const headCells = [
  {
    id: 'account',
    label: 'アカウント',
    align: 'center',
  },
  {
    id: 'followers',
    label: 'フォロワー',
    align: 'left',
  },
  {
    id: 'EGM',
    label: 'EGM',
    align: 'left',
  },
  {
    id: 'cost',
    label: 'コスト',
    align: 'left',
  },
];

const options = {
  instagram: [
    {
      value: 'feed',
      label: 'フィード',
    },
    {
      value: 'reel',
      label: 'リール',
    },
    {
      value: 'story',
      label: 'ストーリー',
    },
  ],
  youtube: [
    {
      value: 'movie',
      label: '動画',
    },
    {
      value: 'short',
      label: 'YouTubeショート',
    },
  ],
};

export default function StepOne({
  method,
  catType,
  selCampId,
  selected,
  setSelected,
  property,
  handleProperty,
}) {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [data, setData] = useState([]);

  useEffect(async () => {
    fetchTableData().catch(console.error);
  }, []);

  const fetchTableData = async () => {
    let ret = await campaignService
      .getCampaignDetail(selCampId, 'list')
      .catch(console.error);
    if (ret.status !== 'ok') {
      toast.error('error occurred');
      return;
    }
    if (!ret.data) {
      setData([]);
      return;
    }
    setData(ret.data.members);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(data);
      return;
    }

    setSelected([]);
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <Box className="step_one">
      {method === 'manual' && (
        <Typography className="section_title">アカウント選択</Typography>
      )}
      <Box className="filter_section">
        <Select
          variant="standard"
          labelId="demo-select-small"
          id="demo-select-small"
          value={status}
          onChange={handleChange}
          disableUnderline
          sx={{
            fontSize: '14px',
          }}
        >
          <MenuItem value={10} sx={{ fontSize: '14px' }}>
            アサイン完了
          </MenuItem>
          <MenuItem value={20} sx={{ fontSize: '14px' }}>
            サイン完了
          </MenuItem>
          <MenuItem value={30} sx={{ fontSize: '14px' }}>
            アサ完了
          </MenuItem>
        </Select>
        <TextField
          className="search"
          size="small"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          placeholder={'アカウントを検索'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Paper
        sx={{
          width: '100%',
          mt: 2,
          mb: 2,
          overflow: 'auto',
          boxShadow: 'none !important',
        }}
      >
        <TableContainer
          style={{
            padding: 10,
          }}
        >
          <Table
            className="styledTable"
            sx={{
              minWidth: '100%',
            }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <StepPageTableHead
              method={method}
              headCells={headCells}
              selected={selected}
              order={order}
              orderBy={orderBy}
              rowCount={data.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            {data.length !== 0 && (
              <TableBody>
                {stableSort(data, getComparator(order, orderBy)).map(
                  (row, index) => {
                    return (
                      <StepPageTableRow
                        key={index}
                        row={row}
                        selected={selected}
                        setSelected={setSelected}
                        index={index}
                        method={method}
                      />
                    );
                  },
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Paper>
      {method === 'manual' && (
        <Stack spacing={5}>
          {catType !== 'tiktok' && (
            <Box>
              <InputLabel
                htmlFor="campaign-type"
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#303030',
                }}
              >
                種類
              </InputLabel>
              <Select
                className="additional_field"
                labelId="campaign-type"
                id="campaign-type"
                value={property.type}
                onChange={(e) => handleProperty('type', e.target.value)}
              >
                {options[catType].map((option, key) => {
                  return (
                    <MenuItem
                      key={key}
                      value={option.value}
                      sx={{ fontSize: '14px' }}
                    >
                      {option.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
          )}
          <Box>
            <InputLabel
              htmlFor="date-time-picker"
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#303030',
              }}
            >
              投稿された日時
            </InputLabel>
            <Box className="post_date_section">
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={jaLocale}
              >
                <DateTimePicker
                  className="date_picker"
                  value={property?.post_date ?? null}
                  onChange={(newValue) => {
                    handleProperty('post_date', newValue);
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField
                        inputProps={{
                          ...params.inputProps,
                          placeholder: '日にち 時間',
                        }}
                        {...params}
                      />
                    );
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </Stack>
      )}
    </Box>
  );
}
