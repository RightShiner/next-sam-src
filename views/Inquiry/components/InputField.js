import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';

export const InputField = ({
  name,
  label,
  placeholder,
  height,
  value,
  onChange,
  error,
  helperText,
  required,
}) => {
  return (
    <Box className="flex-sub-wrapper" mb={5}>
      <Box className="search-item-wrapper">
        <Box
          className="search-item-header"
          sx={{ height: '30px', fontWeight: 'bold' }}
        >
          <span>
            {label} &nbsp; {required ? '*' : ''}
          </span>
        </Box>
      </Box>
      <TextField
        type="text"
        size="small"
        placeholder={placeholder}
        name={name}
        multiline={name === 'message'}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        inputProps={{
          style: {
            fontSize: '18px',
            height: `${height}`,
            backgroundColor: '#fff2f2',
          },
        }}
        sx={{ backgroundColor: '#fff2f2' }}
      />
    </Box>
  );
};
