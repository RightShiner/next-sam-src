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
    title: 'Email address to send survey results',
    error: 'Please enter your e-mail address.',
  },
  jp: {
    title: '調査結果送信先メールアドレス',
    error: 'メールアドレスを入力してください。',
  },
};

export default function EmailField({ email, setEmail, error, setEmailError }) {
  const { locale } = useRouter();
  const theme = useTheme();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
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
            // helperText={error && 'メールアドレスを入力してください。'}
            size="small"
            value={email}
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
                  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
                    email,
                  )
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
