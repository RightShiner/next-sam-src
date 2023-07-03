import clsx from 'clsx';
import React from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  nodecoration: {
    color: '#2d3748',
    textDecoration: 'none',
  },
});

const lang = {
  en: {
    login: 'Login',
  },
  jp: {
    login: 'ログイン',
    toMakers: 'メーカー様向け',
    toRetails: '代理店様向け',
    qna: 'お問い合わせ',
  },
};

const Topbar = ({ onSidebarOpen, pages }) => {
  const { locale } = useRouter();
  const theme = useTheme();
  const classes = useStyles();
  const { features: features } = pages;

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <a
        href={
          process.env.NEXT_PUBLIC_REGION == 'SG'
            ? 'https://astream.sg'
            : 'https://acetokyo.com/astream/b/'
        }
        style={{ marginLeft: '2rem' }}
      >
        <Box
          display={'flex'}
          component={'img'}
          src={'/images/logo/logo.png'}
          width={{ xs: 180, md: 220 }}
          height={1}
        />
      </a>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        {process.env.NEXT_PUBLIC_REGION != 'SG' && (
          <>
            <Box marginLeft={5}>
              <a
                href="https://acetokyo.com/astream/b/#worry-maker"
                className={clsx(classes.nodecoration, 'menuItem')}
              >
                {lang[locale].toMakers}
              </a>
            </Box>
            <Box marginLeft={5}>
              <a
                href="https://acetokyo.com/astream/b/#worry-agency"
                className={clsx(classes.nodecoration, 'menuItem')}
              >
                {lang[locale].toRetails}
              </a>
            </Box>
            <Box marginLeft={5}>
              <a
                href="https://acetokyo.com/astream/b/#contact"
                className={clsx(classes.nodecoration, 'menuItem')}
              >
                {lang[locale].qna}
              </a>
            </Box>
          </>
        )}
        <Box marginLeft={5}>
          <NextLink href={'/signin-cover'} replace>
            <Box
              style={{
                backgroundColor: 'black',
                width: '140px',
                height: '40px',
                borderRadius: '20px',
                marginRight: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <a
                style={{
                  fontWeight: 700,
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                {lang[locale].login}
              </a>
              <ArrowCircleDownIcon
                fontSize="large"
                style={{ marginLeft: '.5rem', transform: 'rotate(-90deg)' }}
              />
            </Box>
          </NextLink>
        </Box>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
};

export default Topbar;
