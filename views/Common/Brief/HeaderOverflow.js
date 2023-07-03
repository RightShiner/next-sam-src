import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { makeStyles } from '@mui/styles';
import {Box, Button, Skeleton} from '@mui/material';
import RoundInfo from 'components/RoundInfo';

const useStyles = makeStyles({
  lazyBorderRound: {
    borderRadius: '50%',
  },
});

const HeaderOverflow = ({}) => {
  const classes = useStyles();
  return (
    <Box className='header'>
      <Box 
        sx={{
          borderRadius: '50%',
          width: '150px !important', 
          height: '150px !important',
          backgroundColor: '#999',
          filter: 'blur(4px)'
        }}
      >
      </Box>
      <Box className='mgt10'>
        <span style={{fontSize:'20px', fontWeight:600, filter: 'blur(4px)'}}>ASTREAM TEST USER</span>
      </Box>
      <Box className='mgt10' sx={{display:'flex', alignItems:'center'}} >
        <span className='mgl5' style={{filter: 'blur(4px)'}}>Contact info available (CSV export)</span>
      </Box>
      <a>
        <span style={{filter: 'blur(4px)'}} className="influencer-header-name">@ASTREAM TEST USER</span>
      </a>
      <Button 
        disabled
        sx={{filter: 'blur(4px)'}}
        onClick={e=>handleOpen()}
        className='manager active mgt20 button-base-inline' 
        variant={'outlined'}>
        フルレポートを表示
      </Button>
      {false &&
        <Box 
          className='mgt20' 
          sx={{
            display: 'flex', 
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            paddingLeft: '1rem',
            paddingRight: '1rem'
          }}
        >
          <span style={{filter: 'blur(4px)', fontSize: '.8rem', color: 'gray', marginRight: '1rem'}}>
            更新日：YYYY年M月D日
          </span>
          <Button 
            disabled
            sx={{filter: 'blur(4px)'}}
            onClick={e=>handleUpdate()}
            className="button-base-inline"
            variant={'outlined'}>
            更新
          </Button>
        </Box>
      }
    </Box>
  );
};

export default HeaderOverflow;