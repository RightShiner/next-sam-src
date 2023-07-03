import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import AddIcon from '@mui/icons-material/Add';

const label = {
  taken_at_org: '投稿日',
  engagement: 'EGM',
  like_count: 'いいね',
  comment_count: 'コメント',
  username: 'アカウント名',
};

const PostCampaignBar = ({
  orderBy,
  setReload,
  setOpen,
  setOrderBy,
  setViewMode,
  handleManualModal,
}) => {
  return (
    <Box className="campaign_bar">
      <Stack direction="row" alignItems="center">
        <IconButton px="14px" onClick={() => setViewMode('table')}>
          <img
            src={'/images/monitoring/table_view.png'}
            alt="table_view"
            width="18px"
            height="16px"
          />
        </IconButton>
        <IconButton px="14px" onClick={() => setViewMode('grid')}>
          <img
            src={'/images/monitoring/grid_view.png'}
            alt="grid_view"
            width="18px"
            height="16px"
          />
        </IconButton>
        <Select
          variant="standard"
          className="sort_selection"
          id="sort_selection"
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
          renderValue={(value) => label[value] + '順'}
          disableUnderline
        >
          <MenuItem value="taken_at_org" sx={{ fontSize: '14px' }}>
            投稿日
          </MenuItem>
          <MenuItem value="engagement" sx={{ fontSize: '14px' }}>
            EGM
          </MenuItem>
          <MenuItem value="like_count" sx={{ fontSize: '14px' }}>
            いいね
          </MenuItem>
          <MenuItem value="comment_count" sx={{ fontSize: '14px' }}>
            コメント
          </MenuItem>
          <MenuItem value="fullname" sx={{ fontSize: '14px' }}>
            アカウント名
          </MenuItem>
        </Select>
      </Stack>
      <Stack spacing={1} direction="row" alignItems="center">
        <TextField className="bar_input" placeholder="投稿を検索" />
        <Button
          className="bar_download_button"
          onClick={() => setOpen((prev) => ({ ...prev, filter: true }))}
        >
          フィルター
        </Button>
        <IconButton className="bar_download_button" sx={{ p: '8px!important' }}>
          <img src={'/images/monitoring/download.png'} alt="download" />
        </IconButton>
        <Button
          onClick={() => setReload((prev) => !prev)}
          className="bar_download_button"
          startIcon={<CachedIcon />}
          sx={{ backgroundColor: '#814BC7!important', color: '#fff!important' }}
        >
          投稿を更新
        </Button>
        <IconButton aria-label="plus" sx={{ color: '#3670C6' }}>
          <AddIcon onClick={handleManualModal} />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default PostCampaignBar;
