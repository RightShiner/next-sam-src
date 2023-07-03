import NextImage from 'next/image';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Constant from 'constants/constants';

const useStyles = makeStyles({
  lazyBorderRound: {
    borderRadius: '50%',
  },
  lazyWrapper: {
    width: '100%',
    '& div': {
      position: 'unset !important',
      height: '100%',
    },
    '& .image': {
      objectFit: 'cover',
      width: '100% !important',
      position: 'relative !important',
      height: 'unset !important',
      maxHeight: 'unset !important',
    },
  },
});

export default function RelativeImageDetail({ imgSrc, isRound, ...rest }) {
  const classes = useStyles();
  return (
    <Box className={classes.lazyWrapper} {...rest}>
      <NextImage
        className={`image lazyimagenoblur ${
          isRound ? classes.lazyBorderRound : ''
        }`}
        src={imgSrc}
        placeholder="blur"
        blurDataURL={Constant.blurImage}
        layout="fill"
      />
    </Box>
  );
}
