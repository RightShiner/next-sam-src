import React from 'react';
import { Button } from '@mui/material';
import keywords from 'constants/lang';
import { useRouter } from 'next/router';

export default function ApplyButton({ type, handleSubmit }) {
  const { locale } = useRouter();
  return (
    <Button
      variant={'outlined'}
      backgroundColor="red"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        width: '8em',
        color: 'white!important',
        borderColor: 'transparent!important',
        backgroundColor:
          type === 'influencer' ? '#1477eb!important' : '#a17fef!important',
      }}
      onClick={handleSubmit}
    >
      {keywords[locale].btn.apply}
    </Button>
  );
}
