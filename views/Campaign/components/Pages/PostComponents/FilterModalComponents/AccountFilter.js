import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Stack,
  Collapse,
  Typography,
  TransitionGroup,
  Checkbox,
  TextField,
  InputAdornment,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';

import RelativeImage from 'components/RelativeImage';

const AccountFilter = ({ filter, setFilter, members }) => {
  const [showMore, setShowMore] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleClick = (val) => () => {
    const selectedIndex = (filter?.influencer ?? []).indexOf(val);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(filter?.influencer ?? [], val);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat((filter?.influencer ?? []).slice(1));
    } else if (selectedIndex === (filter?.influencer ?? []).length - 1) {
      newSelected = newSelected.concat((filter?.influencer ?? []).slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        (filter?.influencer ?? []).slice(0, selectedIndex),
        (filter?.influencer ?? []).slice(selectedIndex + 1),
      );
    }

    // setSelected(newSelected);
    setFilter((prev) => ({ ...prev, influencer: newSelected }));
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = members.map((n) => n.infId);
      // setSelected(newSelected);
      setFilter((prev) => ({ ...prev, influencer: newSelected }));
      return;
    }
    setFilter((prev) => ({ ...prev, influencer: [] }));

    // setSelected([]);
  };

  const handleClear = () => {
    setFilter((prev) => ({ ...prev, influencer: undefined }));
  };

  return (
    <Stack spacing={3} className="filter_account_container">
      <Box className="section_title">
        <Typography className="title">アカウント</Typography>
        <Typography className="clear" onClick={handleClear}>
          リセット
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          <Checkbox
            color="primary"
            indeterminate={
              (filter?.influencer ?? []).length > 0 &&
              (filter?.influencer ?? []).length < members.length
            }
            checked={
              (members ?? []).length > 0 &&
              (filter?.influencer ?? []).length === members.length
            }
            onChange={handleSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
          <Typography sx={{ px: '10px', fontWeight: 'bold', color: '#3670C6' }}>
            {(filter?.influencer ?? []).length}アカウント
          </Typography>
        </Stack>
        <TextField
          className="search"
          size="small"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          placeholder={'アカウント名、user_nameで検索'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box className="filter_account_section">
        {members
          .slice(0, showMore ? members.length : 12)
          .map((member, index) => (
            <Box className="filter_account_box">
              <Checkbox
                color="primary"
                checked={(filter?.influencer ?? []).indexOf(member.infId) > -1}
                onChange={handleClick(member.infId)}
                inputProps={{
                  'aria-labelledby': `enhanced-table-checkbox-${index}`,
                }}
              />
              <RelativeImage
                isRound
                imgSrc={member?.avatar}
                sx={{
                  width: '3.125rem !important',
                  height: '3.125rem !important',
                  margin: '.5rem',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ fontSize: '15px', color: '#303030' }}>
                  {member?.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: 'rgba(48, 48, 48, 0.5)',
                  }}
                >
                  {'@' + member?.infName}
                </Typography>
              </Box>
            </Box>
          ))}
        {members.length > 12 && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              onClick={() => setShowMore((prev) => !prev)}
              sx={{
                fontSize: '14px',
                color: '#0092E4',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              {showMore ? '短く表示' : 'すべて表示'}
            </Typography>
            {showMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default AccountFilter;
