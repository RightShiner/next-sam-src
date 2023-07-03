import moment from 'moment';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { Box, Typography } from '@mui/material';
import RoundInfo from 'components/RoundInfo';

const UsageInfo = ({ getDatas, usages, classes }) => {
  const [userInfo, setUserInfo] = useState(getDatas());

  // console.log(userInfo);

  // useCallback(() => {
  //   let info = getDatas();
  //   setPayEnd(info.payend);
  // }, [getDatas]);

  return (
    <Box>
      <Box
        className="user-wrapper-shadow user-padding-small"
        sx={{ margin: '10px' }}
      >
        <Typography
          className={classes.userdetailwrappertitle}
          sx={{ fontSize: '16px !important' }}
        >
          利用状態
        </Typography>
        <Box
          className={clsx(classes.displayflex, classes.justifybetween)}
          sx={{ margin: '20px 10px' }}
        >
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>ページ検索</Typography>
            <RoundInfo caption={'ページ検索利用率'} marginLeft={1} />
          </Box>
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>{`${usages.pagesuse} of ${usages.pagesplan}`}</Typography>
            <Box className={classes.barcandle}>
              <Box
                className={classes.barcandleprogress}
                sx={{
                  width: `${
                    usages.pagesplan > 0
                      ? (usages.pagesuse / usages.pagesplan) * 100
                      : 100
                  }%`,
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
        <Box
          className={clsx(classes.displayflex, classes.justifybetween)}
          sx={{ margin: '20px 10px' }}
        >
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>レポート表示</Typography>
            <RoundInfo caption={'レポート表示利用率'} marginLeft={1} />
          </Box>
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>{`${usages.profiesuse} of ${usages.profiesplan}`}</Typography>
            <Box className={classes.barcandle}>
              <Box
                className={classes.barcandleprogress}
                sx={{
                  width: `${
                    usages.profiesplan > 0
                      ? (usages.profiesuse / usages.profiesplan) * 100
                      : 100
                  }%`,
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
        {/* <Box className={clsx(classes.displayflex, classes.justifybetween)} sx={{margin: '20px 10px'}}>
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>フルレポート</Typography>
            <RoundInfo caption={'フルレポート利用率'} marginLeft={1}/>
          </Box>
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>{`${usages.reportsuse} of ${usages.reportsplan}`}</Typography>
            <Box className={classes.barcandle}>
              <Box className={classes.barcandleprogress} sx={{width: `${usages.reportsplan > 0 ? usages.reportsuse / usages.reportsplan * 100 : 100}%`}}></Box>
            </Box>
          </Box>
        </Box> */}
        <Box
          className={clsx(classes.displayflex, classes.justifybetween)}
          sx={{ margin: '20px 10px' }}
        >
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>CSV</Typography>
            <RoundInfo caption={'CSV利用率'} marginLeft={1} />
          </Box>
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>{`${usages.csvuse} of ${usages.csvplan}`}</Typography>
            <Box className={classes.barcandle}>
              <Box
                className={classes.barcandleprogress}
                sx={{
                  width: `${
                    usages.csvplan > 0
                      ? (usages.csvuse / usages.csvplan) * 100
                      : 100
                  }%`,
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
        <Box
          className={clsx(classes.displayflex, classes.justifybetween)}
          sx={{ margin: '20px 10px' }}
        >
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>キャンペーン登録</Typography>
            <RoundInfo caption={'キャンペーン登録利用率'} marginLeft={1} />
          </Box>
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>{`${usages.savesuse} of ${usages.savesplan}`}</Typography>
            <Box className={classes.barcandle}>
              <Box
                className={classes.barcandleprogress}
                sx={{
                  width: `${
                    usages.savesplan > 0
                      ? (usages.savesuse / usages.savesplan) * 100
                      : 100
                  }%`,
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
        <Box
          className={clsx(classes.displayflex, classes.justifybetween)}
          sx={{ margin: '20px 10px' }}
        >
          <Box className={clsx(classes.displayflex, classes.aligncenter)}>
            <Typography>{`月間使用可能量は${moment(userInfo.payend).diff(
              moment(),
              'days',
            )}日後の${moment(userInfo.payend).format(
              'YYYY年MM月DD日',
            )}にリセットされます`}</Typography>
          </Box>
          <Box className={clsx(classes.displayflex, classes.aligncenter)}></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UsageInfo;
