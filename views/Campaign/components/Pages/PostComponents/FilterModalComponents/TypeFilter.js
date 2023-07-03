import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const TypeFilter = ({ catType, filter, setFilter }) => {
  const handleChange = (val) => () => {
    const selectedIndex = filter?.type?.indexOf(val) ?? -1;
    let newSelected = filter?.type ?? [];
    if (selectedIndex === -1) {
      newSelected.push(val);
    } else {
      newSelected.splice(selectedIndex, 1);
    }
    setFilter((prev) => ({ ...prev, type: newSelected }));
  };

  const handleClear = () => {
    setFilter((prev) => ({ ...prev, type: undefined }));
  };

  return (
    <Stack spacing={3} className="filter_type_container">
      <Box className="section_title">
        <Typography className="title">投稿</Typography>
        <Typography className="clear" onClick={handleClear}>
          リセット
        </Typography>
      </Box>
      <Stack>
        {catType === 'instagram' && (
          <>
            <FormControlLabel
              className={
                (filter?.type?.indexOf('feed') ?? -1) > -1
                  ? 'checked_box'
                  : 'unchecked_box'
              }
              control={
                <Checkbox
                  checked={(filter?.type?.indexOf('feed') ?? -1) > -1}
                  onChange={handleChange('feed')}
                  name="check-box"
                  defaultChecked
                />
              }
              label="フィード"
            />
            <FormControlLabel
              className={
                (filter?.type?.indexOf('reel') ?? -1) > -1
                  ? 'checked_box'
                  : 'unchecked_box'
              }
              control={
                <Checkbox
                  checked={(filter?.type?.indexOf('reel') ?? -1) > -1}
                  onChange={handleChange('reel')}
                  name="check-box"
                  defaultChecked
                />
              }
              label="リール"
            />
            <FormControlLabel
              className={
                (filter?.type?.indexOf('story') ?? -1) > -1
                  ? 'checked_box'
                  : 'unchecked_box'
              }
              control={
                <Checkbox
                  checked={(filter?.type?.indexOf('story') ?? -2) > -1}
                  onChange={handleChange('story')}
                  name="check-box"
                  defaultChecked
                />
              }
              label="ストーリー"
            />
          </>
        )}
        {catType === 'youtube' && (
          <>
            <FormControlLabel
              className={
                (filter?.type?.indexOf('movie') ?? -1) > -1
                  ? 'checked_box'
                  : 'unchecked_box'
              }
              control={
                <Checkbox
                  checked={(filter?.type?.indexOf('movie') ?? -1) > -1}
                  onChange={handleChange('movie')}
                  name="check-box"
                  defaultChecked
                />
              }
              label="動画"
            />
            <FormControlLabel
              className={
                (filter?.type?.indexOf('short') ?? -1) > -1
                  ? 'checked_box'
                  : 'unchecked_box'
              }
              control={
                <Checkbox
                  checked={(filter?.type?.indexOf('short') ?? -2) > -1}
                  onChange={handleChange('short')}
                  name="check-box"
                  defaultChecked
                />
              }
              label="youtubeショート"
            />
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default TypeFilter;
