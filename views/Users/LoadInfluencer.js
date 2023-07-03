import _ from 'lodash';
import React, { useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import {
  Box,
  Select,
  MenuItem,
  TextareaAutosize,
  Typography,
  Button,
  TextField,
  LinearProgress,
} from '@mui/material';
import { loadService } from 'services';
import toast from 'react-hot-toast';
import Constants from 'constants/constants';

const LoadInfluencer = () => {
  const inputRef = useRef(),
    faildRef = useRef();
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  });
  const [tempProg, setTempProg] = useState(0);
  const [timer, setTimer] = useState(null);
  const [downs, setDownloads] = useState(0);
  const [status, setStatus, statusRef] = useState({ isprogressing: false });
  const [error, setError] = useState('');
  const [selType, setSelectedType] = useState('');

  const loadBtnClicked = () => {
    if (status.isprogressing === true) {
      stopDownload('中止しました。');
    } else {
      if (inputRef.current.value.length < 1) {
        toast.error('userIDを入力して下さい');
        return;
      }

      if (selType === '') {
        toast.error('インフルエンサーのtypeを選択して下さい。');
        return;
      }

      setStatus({ isprogressing: true });
      setTimeout(downloadInfluencers, 100);

      setTimer(
        setInterval(() => {
          setTempProg((prevProgress) =>
            prevProgress >= 100 ? 0 : prevProgress + 10,
          );
        }, 500),
      );
    }
  };

  const stopDownload = async (msg) => {
    setStatus({ isprogressing: false });
    setTimer((prevTimer) => {
      clearInterval(prevTimer);
      return null;
    });

    if (msg !== null && msg !== '') {
      toast.error(msg);
      setError(msg);
    } else if (msg === null) {
      toast.success('ダウンロードが終わりました。');
      setError('ダウンロードが終わりました。');
    }
  };

  const downloadInfluencers = async () => {
    if (!statusRef.current.isprogressing) return;

    if (
      !inputRef.current ||
      !inputRef.current.value ||
      inputRef.current.value.length < 1
    ) {
      stopDownload(null);
      return;
    }

    const tmpLists = inputRef.current.value.split('\n');
    if (tmpLists.length < 1) {
      stopDownload(null);
      return;
    }

    let userLists = tmpLists.slice(0, 100);

    const result = await loadService.downloadInfluencers(selType, userLists);
    if (result.status !== 'ok') {
      if (result.data > 0) {
        faildRef.current.value =
          faildRef.current.value + '\n' + result.failed.join('\n');
        inputRef.current.value = tmpLists.slice(result.data).join('\n');
        setDownloads((prevState) => prevState + result.data);
      }
      stopDownload(result.msg);
      return;
    }

    inputRef.current.value = tmpLists.slice(100).join('\n');
    faildRef.current.value =
      faildRef.current.value + '\n' + result.failed.join('\n');

    setDownloads((prevState) => prevState + result.data);
    //setDownloads((prevState) => (prevState + 100));
    setTimeout(downloadInfluencers, 10);
  };

  return (
    <Fixed hideAnnouncement={true}>
      <Container>
        <Box paddingTop={2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            MODASHからインフルエンサーを取得
          </Typography>
          {error && (
            <Typography
              variant="h6"
              gutterBottom
              sx={{ marginBottom: 2, color: 'red' }}
            >
              {error}
            </Typography>
          )}
        </Box>
        <Box sx={{ width: '750px' }}>
          <Box>
            <Select
              value={selType}
              onChange={(e) => setSelectedType(e.target.value)}
              size="small"
              sx={{ width: '250px' }}
            >
              <MenuItem value={Constants.snsInstagram}>
                {Constants.snsInstagram}
              </MenuItem>
              <MenuItem value={Constants.snsYoutube}>
                {Constants.snsYoutube}
              </MenuItem>
              <MenuItem value={Constants.snsTiktok}>
                {Constants.snsTiktok}
              </MenuItem>
            </Select>
          </Box>
          <Box marginTop={2}>
            <Box sx={{ display: 'flex' }}>
              <TextField
                size="small"
                multiline
                label="ダウンロードしたい人のuserID"
                inputRef={inputRef}
                rows={20}
                inputProps={{
                  style: {
                    fontSize: '14px',
                    width: '350px',
                  },
                }}
              />
              <TextField
                size="small"
                multiline
                label="失敗した人のuserID"
                inputRef={faildRef}
                rows={20}
                inputProps={{
                  style: {
                    fontSize: '14px',
                    width: '350px',
                  },
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            paddingTop={2}
            paddingBottom={2}
          >
            <Button
              className={`${status.isprogressing === true ? '' : 'active'}`}
              variant="outlined"
              sx={{
                paddingTop: '1.5rem !important',
                width: '300px !important',
                paddingBottom: '1.5rem !important',
              }}
              onClick={(e) => loadBtnClicked()}
            >
              {status.isprogressing === true ? (
                <>
                  <Box
                    component={'img'}
                    src={'/images/svgs/cancel.svg'}
                    height={24}
                    width={24}
                    marginRight={1.5}
                  />
                  中止
                </>
              ) : (
                <>
                  <Box
                    component={'img'}
                    src={'/images/svgs/download.svg'}
                    height={24}
                    width={24}
                    marginRight={1.5}
                  />
                  ダウンロード開始
                </>
              )}
            </Button>
          </Box>
          <Box paddingTop={4}>
            <Typography
              sx={{
                marginBottom: 2,
              }}
            >
              進陟状況：{formatter.format(downs)}
            </Typography>
            <LinearProgress variant="determinate" value={tempProg} />
            <Typography
              sx={{
                color: 'red',
                marginTop: 1,
              }}
            >
              ダウンロードしながら他の操作は進まないでください。
            </Typography>
          </Box>
        </Box>
      </Container>
    </Fixed>
  );
};

export default LoadInfluencer;
