import NextImage from 'next/image';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Constant from 'constants/constants';

const useStyles = makeStyles({
  lazyWrapper: {
    width: '100%',
    '& div': {
      position: 'unset !important',
      height: '100%'
    },
    '& .image': {
      objectFit: 'contain',
      width: '100% !important',
      position: 'relative !important',
      height: 'unset !important'
    }
  }
});

export default function LogoImage({imgSrc, ...rest}) {
  const classes = useStyles();
  return (
    <Box className={classes.lazyWrapper} {...rest}>
      <NextImage 
        className={`image lazyimagenoblur`}
        src={imgSrc}
        layout="fill"
      />
    </Box>
  );
};