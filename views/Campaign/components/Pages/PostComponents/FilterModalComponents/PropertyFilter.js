import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RemoveIcon from '@mui/icons-material/Remove';

import { propertyKeys } from 'constants/propertyKeys';

const TypeFilter = ({ filter, setFilter }) => {
  const theme = useTheme();

  const handleClear = () => {
    propertyKeys.map((val) => {
      setFilter((prev) => ({
        ...prev,
        [val.key]: undefined,
      }));
    });
  };

  return (
    <Stack spacing={3} className="filter_property_container">
      <Box className="section_title">
        <Typography className="title">各種数値</Typography>
        <Typography className="clear" onClick={handleClear}>
          リセット
        </Typography>
      </Box>
      <Stack spacing={2}>
        {propertyKeys.map((item, key) => {
          return (
            <Box key={key} display="flex" justifyContent="space-between">
              <Typography
                sx={{
                  fontSize: '16px',
                  color: '#303030',
                  fontWeight: item.isChildren ? '400' : 'bold',
                  pl: item.isChildren ? 3 : 0,
                }}
              >
                {item.name}
              </Typography>
              {!item.hasChildren && (
                <Box display="flex">
                  <TextField
                    value={filter?.[item.key]?.min ?? ''}
                    onChange={(e) => {
                      setFilter((prev) => ({
                        ...prev,
                        [item.key]: { ...prev[item.key], min: e.target.value },
                      }));
                    }}
                    size="small"
                    placeholder="0"
                    type="number"
                    min="0"
                    sx={{ width: '133px' }}
                    inputProps={{
                      style: {
                        fontSize: '14px',
                        backgroundColor: `${
                          filter?.[item.key]?.min
                            ? theme.palette.clrVariables.cyanVeryLight
                            : theme.palette.clrVariables.grayWhite
                        }`,
                      },
                    }}
                  />
                  <RemoveIcon
                    size="small"
                    sx={{ color: 'rgba(48, 48, 48, 0.5)' }}
                  />
                  <TextField
                    value={filter?.[item.key]?.max ?? ''}
                    onChange={(e) => {
                      setFilter((prev) => ({
                        ...prev,
                        [item.key]: { ...prev[item.key], max: e.target.value },
                      }));
                    }}
                    size="small"
                    placeholder="1345"
                    type="number"
                    sx={{ width: '133px' }}
                    inputProps={{
                      style: {
                        fontSize: '14px',
                        backgroundColor: `${
                          filter?.[item.key]?.max
                            ? theme.palette.clrVariables.cyanVeryLight
                            : theme.palette.clrVariables.grayWhite
                        }`,
                      },
                    }}
                  />
                </Box>
              )}
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default TypeFilter;
