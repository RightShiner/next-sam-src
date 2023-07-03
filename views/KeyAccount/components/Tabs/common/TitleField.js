import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

const lang = {
  en: {
    title: 'Survey title',
    error: 'Please enter a title.',
  },
  jp: {
    title: '調査タイトル',
    error: 'タイトルを入力してください。',
  },
};

export default function TitleField({ title, setTitle, error, setTitleError }) {
  const { locale } = useRouter();
  const theme = useTheme();

  const handleChange = (e) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  return (
    <>
      <Typography
        variant="body1"
        style={{
          fontWeight: '600',
        }}
      >
        {lang[locale].title}
      </Typography>
      <Box mt={1} mb={3}>
        <FormControl sx={{ width: '100%' }} error>
          {error && <FormHelperText>{lang[locale].error}</FormHelperText>}
          <TextField
            error={error}
            // helperText={error && 'タイトルを入力してください。'}
            size="small"
            value={title}
            onChange={handleChange}
            inputProps={{
              style: {
                fontSize: '14px',
              },
            }}
            sx={{
              width: '100%',
              '& fieldset': {
                borderColor: `${
                  title !== ''
                    ? theme.palette.clrVariables.cyanLight
                    : 'rgba(0,0,0,0.23)'
                }`,
              },
            }}
          />
        </FormControl>
      </Box>
    </>
  );
}
