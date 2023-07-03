import React from 'react';
import Box from '@mui/material/Box';
import Empty from 'layouts/Empty';
import Container from 'components/Container';
import Typography from '@mui/material/Typography';

const Reset = ({isreset}) => {
  return (
    <Empty>
      <Box
        sx={{
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      >
        <Container paddingX={0} paddingY={6} maxWidth={{md: 1024 }} style={{height: 'calc(100vh - 285px + 64px)', display: 'flex', alignItems: 'center'}}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              textAlign: 'center'
            }}
          >
          {isreset ?
            'パスワードを「123456789」に再設定しました。ログイン後、パスワードを再設定してください。'
            :
            'パスワード再設定に失敗しました。管理者に質問してください。'
          }
          </Typography>
        </Container>
      </Box>
    </Empty>
  );
};

export default Reset;
