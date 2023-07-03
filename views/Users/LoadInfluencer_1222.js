import _ from 'lodash';
import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import {
  Box,
  Typography,
  Button,
  TextField,
  LinearProgress,
} from '@mui/material';
import { loadService } from 'services';
import toast from 'react-hot-toast';

const LoadInfluencer = () => {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  });
  const [tempProg, setTempProg] = useState(0);
  const [timer, setTimer] = useState(null);
  const [downs, setDownloads] = useState(0);
  const [status, setStatus, statusRef] = useState({ isprogressing: false });

  const [error, setError] = useState('');
  const [startIndex, setStartIndex, startRef] = useState(0);
  const [counts, setDownCount, countRef] = useState(0);
  const [totals, setTotals, totalsRef] = useState({
    instas: 0,
    yous: 0,
    tiks: 0,
    totals: 0,
  });

  useEffect(() => {
    return loadService
      .getTotalInfluencers()
      .then((ret) => {
        if (ret.status === 'ok') {
          setTotals({
            instas: +ret.data.instagrams,
            yous: +ret.data.youtubes,
            tiks: +ret.data.tiktoks,
            totals:
              +ret.data.instagrams + +ret.data.youtubes + +ret.data.tiktoks,
          });
        } else {
          setError(ret.msg);
        }
      })
      .catch((ex) => {
        setError(ex.toString());
      });
  }, []);

  const influcerBtnClicked = () => {
    if (status.isprogressing === true) {
      stopDownload('中止しました。');
    } else {
      setStatus({ isprogressing: true });
      setTimeout(getInfluencers, 100);

      setTimer(
        setInterval(() => {
          setTempProg((prevProgress) =>
            prevProgress >= 100 ? 0 : prevProgress + 10,
          );
        }, 500),
      );
    }
  };

  const getInfluencers = async () => {
    if (totalsRef.current.totals === 0) {
      stopDownload('');
      return;
    }

    const startPos = +startRef.current;

    let pgIdx = 0;
    if (startPos < totalsRef.current.instas) pgIdx = Math.floor(startPos / 15);
    else if (startPos < totalsRef.current.instas + totalsRef.current.yous)
      pgIdx = Math.floor((startPos - totalsRef.current.instas) / 15);
    else if (startPos >= totalsRef.current.instas + totalsRef.current.yous)
      pgIdx = Math.floor(
        (startPos - totalsRef.current.instas - totalsRef.current.yous) / 15,
      );

    setTimeout(downloadInfluencers, 100, startPos, pgIdx);
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
    }
  };

  const downloadInfluencers = async (downs, idx) => {
    const instas = totalsRef.current.instas;
    const yous = totalsRef.current.yous;

    let type = '';
    if (downs < instas) {
      type = 'instagram';
    } else if (downs < instas + yous) {
      if (idx * 15 >= instas) idx = 0;
      type = 'youtube';
    } else {
      if (idx * 15 >= instas + yous) idx = 0;
      type = 'tiktok';
    }

    if (downs >= +startRef.current + +countRef.current) {
      stopDownload(null);
      return;
    }

    if (!statusRef.current.isprogressing) return;

    const result = await loadService.downloadInfluencers(type, idx);
    if (result.status !== 'ok') {
      stopDownload(result.msg);
      return;
    }

    setDownloads((prevState) => prevState + result.data);

    setTimeout(downloadInfluencers, 10, downs + result.data, idx + 1);
  };

  return (
    <Fixed>
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
          <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
            INSTAGRAMS:{formatter.format(totals.instas)}
            &nbsp;&nbsp;&nbsp;&nbsp;YOUTUBES:{formatter.format(totals.yous)}
            &nbsp;&nbsp;&nbsp;TIKTOKS:{formatter.format(totals.tiks)}
            &nbsp;&nbsp;&nbsp;合計:{formatter.format(totals.totals)}
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
        <Box sx={{ width: '650px' }}>
          <Box sx={{ display: 'flex' }}>
            <TextField
              value={startIndex}
              label="開始位置"
              onChange={(e) => setStartIndex(e.currentTarget.value)}
              type="number"
              sx={{ width: '200px', marginRight: '32px' }}
            />
            <TextField
              value={counts}
              label="ダウンロードしたい人数"
              onChange={(e) => setDownCount(e.currentTarget.value)}
              type="number"
              sx={{ width: '200px' }}
            />
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
              onClick={(e) => influcerBtnClicked()}
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

// const LoadInfluencer = () => {
//   const formatter = new Intl.NumberFormat('en-US', {maximumFractionDigits: 0});
//   const [downloads, setDownloads, downloadsRef] = useState({downs: 0, totals: 0});
//   const [tempProg, setTempProg] = useState(0);
//   const [timer, setTimer] = useState(null);
//   const [lastUpdate, setLastUpdate] = useState(null);
//   const [status, setStatus, statusRef] = useState({isprogressing: false});
//   // const [downloadFinished, setDownloadFinished] = useState(false);

//   useEffect(() => {
//     return loadService.getlastupdated()
//       .then((ret) => {
//         if (ret.status !== 'ok')
//           setLastUpdate(null);
//         else
//           setLastUpdate(ret.data);
//       });
//   }, []);

//   // useEffect(() => {
//   //   if (downloadFinished === true) {
//   //     setLastUpdate({
//   //       status: downloads.totals <= downloads.downs,
//   //       type: '',
//   //       downloads: downloads.downs,
//   //       totals: downloads.totals,
//   //       error: error,
//   //       updated: moment().format('YYYY-MM-DD')
//   //     });

//   //     setDownloadFinished(false);

//   //     return loadService.setlastUpdated(
//   //       downloads.totals <= downloads.downs,
//   //       '',
//   //       downloads.downs,
//   //       downloads.totals,
//   //       error,
//   //       moment().format('YYYY-MM-DD')
//   //     ).then(response => {
//   //       return null;
//   //     });
//   //   }
//   // }, [downloads, downloadFinished]);

//   const influcerBtnClicked = () => {
//     if (status.isprogressing === true) {
//       stopDownload('');
//     } else {
//       if (lastUpdate !== null && !lastUpdate.completed)
//         setDownloads((prevState) => ({
//           downs: lastUpdate.downloads, totals: lastUpdate.totals
//         }));

//       setStatus({isprogressing: true});
//       setTimeout(getInfluencers, 100);

//       setTimer(setInterval(() => {
//         setTempProg((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
//       }, 500));
//     }
//   }

//   const getInfluencers = async () => {
//     let instas = 0, yous = 0, tiks = 0, totals = 0, msg = '';
//     await loadService.getTotalInfluencers()
//       .then((ret) => {
//         if (ret.status === 'ok') {
//           instas = ret.data.instagrams;
//           yous = ret.data.youtubes;
//           tiks = ret.data.tiktoks;
//           totals = instas + yous + tiks;
//         } else {
//           msg = ret.msg;
//         }
//       }).catch(ex => {
//         instas = 0;
//         yous = 0;
//         tiks = 0;
//         response = ex.toString();
//       });

//     if (totals === 0) {
//       stopDownload(msg);
//       return;
//     }

//     if (lastUpdate.completed) {
//       setTimeout(downloadInfluencers, 100, instas, yous, tiks, 0, 0);
//     } else {
//       let pgIdx = 0;
//       if (lastUpdate.downloads < instas)
//         pgIdx = Math.floor(lastUpdate.downloads / 15);
//       else if (lastUpdate.downloads < instas + yous)
//         pgIdx = Math.floor((lastUpdate.downloads - instas) / 15);
//       else if (lastUpdate.downloads >= instas + yous)
//         pgIdx = Math.floor((lastUpdate.downloads - instas - yous) / 15);

//       setTimeout(downloadInfluencers, 100, instas, yous, tiks, pgIdx, lastUpdate.downloads);
//     }
//     //setTimeout(downloadInfluencers, 10, 15, 15, 15, 0, 0);
//   }

//   const stopDownload = async (msg) => {
//     setStatus({isprogressing: false});
//     setTimer((prevTimer) => {
//       clearInterval(prevTimer);
//       return null;
//     });

//     if (msg !== null && msg !== '') {
//       toast.error(msg);
//     } else if (msg === null) {
//       toast.success('ダウンロードが終わりました。');
//     }

//     setLastUpdate({
//       status: downloadsRef.current.totals <= downloadsRef.current.downs,
//       type: '',
//       downloads: downloadsRef.current.downs,
//       totals: downloadsRef.current.totals,
//       error: msg??0,
//       updated: moment().format('YYYY-MM-DD')
//     });

//     return loadService.setlastUpdated(
//       downloadsRef.current.totals <= downloadsRef.current.downs,
//       '',
//       downloadsRef.current.downs,
//       downloadsRef.current.totals,
//       msg??'',
//       moment().format('YYYY-MM-DD')
//     ).then(response => {
//       return null;
//     });
//   }

//   const downloadInfluencers = async (instas, yous, tiks, idx, downs) => {
//     const totals = instas + yous + tiks;
//     let type = '';
//     if (downs < instas) {
//       type = 'instagram';
//     }
//     else if (downs < instas + yous) {
//       if (idx * 15 >= instas)
//         idx = 0;
//       type = 'youtube';
//     }
//     else {
//       if (idx * 15 >= instas + yous)
//         idx = 0;
//       type = 'tiktok';
//     }

//     if (!statusRef.current.isprogressing)
//       return;

//     const result = await loadService.downloadInfluencers(type, idx);
//     if (result.status !== 'ok') {
//       stopDownload(result.msg);
//       return;
//     }

//     setDownloads(prevState => ({
//       downs: prevState.downs + result.data,
//       totals: totals
//     }));

//     await loadService.setlastUpdated(
//       downs + result.data <= totals,
//       '',
//       downs + result.data,
//       totals,
//       '',
//       moment().format('YYYY-MM-DD')
//     );

//     if (downs + result.data >= totals) {
//       stopDownload(null);
//       return;
//     }

//     setTimeout(downloadInfluencers, 10, instas, yous, tiks, idx + 1, downs + result.data);
//   }

//   return (
//     <Fixed>
//       <Container>
//         <Box paddingTop={2}>
//           <Typography
//             variant="h5"
//             gutterBottom
//             sx={{
//               fontWeight: 700,
//               marginBottom: 4
//             }}
//           >
//             MODASHからインフルエンサーを取得
//           </Typography>
//           {lastUpdate !== null &&
//             <Typography
//               variant="h6"
//               gutterBottom
//               sx={{marginBottom: 2}}
//             >
//               最新更新日：{lastUpdate.updated}&nbsp;&nbsp;&nbsp;&nbsp;最新更新状態：{`${lastUpdate.completed ? '完了' : '未完成'}`}&nbsp;&nbsp;&nbsp;ダウンロード人数：{lastUpdate.downloads}&nbsp;&nbsp;&nbsp;合計：{lastUpdate.totals}
//             </Typography>
//           }
//           {lastUpdate !== null && lastUpdate.error &&
//             <Typography
//               variant="h6"
//               gutterBottom
//               sx={{marginBottom: 2, color: 'red'}}
//             >
//               {lastUpdate.error}
//             </Typography>
//           }
//         </Box>
//         <Box sx={{width: '650px'}}>
//           <Box sx={{display: 'flex', justifyContent:'space-between'}} paddingTop={2} paddingBottom={2}>
//             <Button
//               className={`${status.isprogressing === true ? '' : 'active'}`}
//               variant="outlined"
//               sx={{paddingTop: '1.5rem !important', width:'300px !important', paddingBottom: '1.5rem !important'}}
//               onClick={e=>influcerBtnClicked()}
//             >
//             {status.isprogressing === true ?
//               <>
//                 <Box
//                   component={'img'}
//                   src={'/images/svgs/cancel.svg'}
//                   height={24} width={24}
//                   marginRight={1.5}
//                 />
//                 中止
//               </> :
//               <>
//                 <Box
//                   component={'img'}
//                   src={'/images/svgs/download.svg'}
//                   height={24} width={24}
//                   marginRight={1.5}
//                 />
//                 {lastUpdate === null || lastUpdate.completed ? 'ダウンロード開始' : '引き続きダウンロード'}
//               </>
//             }
//             </Button>
//           </Box>
//           <Box paddingTop={4}>
//             <Typography
//               sx={{
//                 marginBottom: 2
//               }}
//             >
//               進陟状況：{formatter.format(downloads.downs)}
//             </Typography>
//             <LinearProgress variant="determinate" value={tempProg} />
//             <Typography
//               sx={{
//                 color: 'red',
//                 marginTop: 1
//               }}
//             >
//               ダウンロードしながら他の操作は進まないでください。
//             </Typography>
//           </Box>
//         </Box>

//       </Container>
//     </Fixed>
//   );
// };

// export default LoadInfluencer;
