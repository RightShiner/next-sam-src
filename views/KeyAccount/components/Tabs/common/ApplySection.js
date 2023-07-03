import React from 'react';
import { Chip, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';

export default function ApplySection({ type, request }) {
  const { locale } = useRouter();

  return (
    <>
      <Box
        mt={4}
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontWeight: '700',
            fontSize: '1em',
            marginRight: 3,
            display: 'inline-block',
            letterSpacing: '2px',
          }}
        >
          {locale === 'en' ? 'Request history' : '申請履歴'}
        </Typography>
        <Chip
          label={request.length}
          size="small"
          sx={{
            padding: '7px',
            color: 'white',
            backgroundColor: type === 'influencer' ? '#1477eb' : '#a17fef',
          }}
        />
      </Box>
      <Box>
        <Box pt={2}>
          {request.map((item, key) => {
            return (
              <Box
                key={key}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '15px',
                  borderBottom: '1px solid #707070',
                }}
              >
                <Typography variant="body2">{item.title}</Typography>
                <Typography variant="body2" ml={5}>
                  {item.date}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
