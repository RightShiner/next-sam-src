import NextImage from 'next/image';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Constant from 'constants/constants';

const useStyles = makeStyles({
  lazyBorderRound: {
    borderRadius: '50%'
  },
  lazyWrapper: {
    width: '100%',
    '& div': {
      position: 'unset !important',
      height: '100%'
    },
    '& .image': {
      objectFit: 'cover',
      width: '100% !important',
      position: 'relative !important',
      height: 'unset !important'
    }
  },
  avatarWrapper: {
    width: '100%',
    '& div': {
      position: 'unset !important',
      height: '100%',
      minWidth: '3.15rem !important'
    },
    '& .image': {
      objectFit: 'cover',
      width: '100% !important',
      position: 'relative !important',
      height: 'unset !important'
    }
  }
});

export default function RelativeImage({imgSrc, isRound, isAvatar, ...rest}) {
  const classes = useStyles();
  return (
    <Box className={isAvatar ? classes.avatarWrapper : classes.lazyWrapper} {...rest}>
      <NextImage 
        className={`image lazyimagenoblur ${isRound ? classes.lazyBorderRound : ''}`}
        src={imgSrc}
        placeholder="blur"
        blurDataURL={Constant.blurImage}
        layout="fill"
      />
    </Box>
  );
};