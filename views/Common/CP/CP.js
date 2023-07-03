import moment from 'moment';
import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import toast from 'react-hot-toast';
import {
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Box,
  Button,
  Typography,
  Rating,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RightSidebar from './RightSidebar';
import WaitingLoader from './WaitingLoader';
import RelativeImage from 'components/RelativeImage';
import { AlertDlg, SaveDlg, SelectTagDlg } from 'views/Common';
import Lang from 'constants/lang';
import { getSortedTags } from 'constants/constants';
import { accountService } from 'services';
import { useRouter } from 'next/router';

const lang = {
  jp: {
    toastSuccessToSave: '保存しました。',
    toastFailToSave: 'アカウント情報保存に失敗しました。',
    addFlag: '追加',
    inputMemo: 'メモ入力',
    campaignName: 'キャンペーン名',
    genre: 'ジャンル',
    sns: 'SNS',
    createdAt: '作成日',
    noCampaign: '参加したキャンペーンがありません。',
    caution: '注意',
    confirmToDiscard:
      '更新されていません。入力情報が失われますがよろしいでしょうか？',
  },
  en: {
    toastSuccessToSave: 'Successfully saved the account information.',
    toastFailToSave: 'Failed to save the account information.',
    addFlag: 'Add tags',
    inputMemo: 'Input memo',
    campaignName: 'Campaign',
    genre: 'Genre',
    sns: 'SNS',
    createdAt: 'Created',
    noCampaign: 'No campaign includes this account',
    caution: 'Caution',
    confirmToDiscard: 'The input information will be lost, but is it okay?',
  },
};

const CP = ({ accountId, stars = 0, setCollapse }) => {
  const { locale } = useRouter();
  const [ratingValue, setRatingValue] = useState(stars);
  const [tags, setTags] = useState([]);
  const [data, setData] = useState(null);
  const [memo, setMemo] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [showDlg, setDlgState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const closeSaveDialog = () => {
    setAnchorEl(null);
  };

  const closeAlertDialog = (status) => {
    setDlgState(false);

    if (status === true) {
      setCollapse({ star: !data || !data.star ? 0 : data.star, tags });
    }
  };

  const setRightSidebarClose = () => {
    if (!data) {
      setCollapse(0);
      return;
    }

    if (data.star !== ratingValue || (data.memo && data.memo !== memo)) {
      setDlgState(true);
      return;
    }

    setCollapse({ star: !data || !data.star ? 0 : data.star, tags });
  };

  const updateData = () => {
    accountService
      .updateAccount(accountId, ratingValue, memo)
      .then((response) => {
        if (response.status !== 'ok') {
          toast.error(response.msg);
          return;
        }
        toast.success(lang[locale].toastSuccessToSave);
        setData({ ...data, star: ratingValue, memo: memo });
      })
      .catch((err) => {
        toast.error(lang[locale].toastFailToSave);
      });
  };

  useEffect(() => {
    if (!accountId || accountId === '') {
      return;
    }

    accountService
      .getCampaingsDetail(accountId)
      .then((response) => {
        if (response.status !== 'ok') {
          setData(null);
          toast.error(response.msg);
          return;
        }

        let results = response.data;
        if (results.length < 1) return;

        // if (memoInput.current)
        //   memoInput.current.value = results[0].memo || '';

        setCampaigns(
          results.map((itm) => {
            return {
              cid: itm.cid,
              cname: itm.cname,
              csns: itm.csns,
              ctype: itm.ctype,
              cdate: itm.cdate,
              deleted: itm.deleted,
            };
          }),
        );

        setData({
          name: results[0].name,
          link: results[0].link,
          star: results[0].star,
          memo: results[0].memo,
          infId: results[0].infId,
          type: results[0].type,
          avatar: results[0].avatar,
          infName: results[0].infName,
        });
        setMemo(results[0].memo || '');
        setRatingValue(results[0].star);
        setTags(results[0].tags ?? []);
      })
      .catch((err) => {
        toast.error(err.toString());
      });
  }, [accountId]);

  const [anchorTag, setAnchorTag] = useState(null);
  const closeTagDlg = () => {
    setAnchorTag(null);
  };

  const appendTag = (_id, name, color, isChecked) => {
    if (isChecked) {
      setTags([...tags, { tagId: _id, name, color }]);
    } else {
      setTags(_.filter(tags, (tag) => tag.tagId !== _id));
    }
  };

  return (
    <RightSidebar
      extraClass={'campaign-sidebar'}
      autoClose={false}
      isCollapse={accountId === ''}
      setCollapse={setRightSidebarClose}
    >
      <Box className="toolbar" style={{ zIndex: 1 }}>
        <Button className="close" onClick={(evt) => setRightSidebarClose()}>
          <CloseIcon fontSize="small" />
        </Button>
        {data !== null && (
          <Box sx={{ display: 'flex' }}>
            <Button
              className="active"
              onClick={(e) => updateData()}
              sx={{ marginRight: '.5rem' }}
            >
              <span>{Lang[locale].btn.save}</span>
            </Button>
            <Box className="relative-action">
              <Button
                className="save"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <span>{Lang[locale].btn.register}</span>
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      {data === null ? (
        <WaitingLoader />
      ) : (
        <Box style={{ zIndex: 0 }}>
          <Box className="profile-container">
            <RelativeImage
              isRound
              imgSrc={data.avatar}
              sx={{
                width: '150px !important',
                height: '150px !important',
                margin: '1rem',
              }}
            />
            <Typography className="name">{data.name}</Typography>
            <Box className="link" component="a" href={data.link}>
              @{data.infName}
            </Box>
            <Rating
              value={ratingValue}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
              }}
            />
            <Box sx={{ marginTop: '1rem' }}>
              {_.map(getSortedTags(tags), (itm, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '.5rem',
                    rowGap: '.5rem',
                    flexWrap: 'wrap',
                    marginBottom: '.5rem',
                  }}
                >
                  {_.map(itm.members, (curMem) => (
                    <span
                      key={curMem._id}
                      style={{
                        border: `1px solid ${curMem.color}`,
                        color: `${curMem.color}`,
                        padding: '.2rem',
                        borderRadius: '.2rem',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      {curMem.name}
                    </span>
                  ))}
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  setAnchorTag(e.currentTarget);
                }}
              >
                {lang[locale].addFlag}
              </Button>
            </Box>
            <TextField
              multiline
              rows="5"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              variant="outlined"
              size="small"
              placeholder={lang[locale].inputMemo}
              sx={{
                width: '80%',
                marginTop: '10px',
                fontSize: '14px',
                padding: '8px',
              }}
              InputProps={{
                classes: { input: 'customPlaceholder' },
                style: { color: '#000' },
              }}
              // inputRef={memoInput}
            />
          </Box>
          <Box className="profile-detail">
            <TableContainer style={{ padding: 1 }}>
              <Table
                className="styledTable"
                aria-labelledby="tableTitle"
                size="medium"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>{lang[locale].campaignName}</TableCell>
                    <TableCell>{lang[locale].genre}</TableCell>
                    <TableCell>{lang[locale].sns}</TableCell>
                    <TableCell>{lang[locale].createdAt}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {campaigns.length > 0 ? (
                    campaigns.map((row, index) => {
                      return (
                        !row.deleted && (
                          <NextLink
                            key={index}
                            href={`/campaign/detail/${row.cid}`}
                            passHref
                          >
                            <TableRow
                              hover
                              // onClick={() => handleClick(row.cid)}
                              key={index}
                            >
                              <TableCell>{row.cname}</TableCell>
                              <TableCell>{row.ctype}</TableCell>
                              <TableCell>
                                {row.csns === 'instagram' && (
                                  <Box
                                    component={LazyLoadImage}
                                    effect="blur"
                                    src={'/images/svgs/instagram.svg'}
                                    width={'24px'}
                                    height={'24px'}
                                  />
                                )}
                                {row.csns === 'youtube' && (
                                  <Box
                                    component={LazyLoadImage}
                                    effect="blur"
                                    src={'/images/svgs/youtube.svg'}
                                    width={'24px'}
                                    height={'24px'}
                                  />
                                )}
                                {row.csns === 'tiktok' && (
                                  <Box
                                    component={LazyLoadImage}
                                    effect="blur"
                                    src={'/images/svgs/tiktok.svg'}
                                    width={'24px'}
                                    height={'24px'}
                                  />
                                )}
                              </TableCell>
                              <TableCell>
                                {moment(row.cdate).format('YYYY/MM/DD')}
                                <br />
                              </TableCell>
                            </TableRow>
                          </NextLink>
                        )
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                        {lang[locale].noCampaign}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <SaveDlg
            anchorEl={anchorEl}
            closeDlg={closeSaveDialog}
            infId={data ? data.infId : ''}
            catType={data ? data.type : ''}
          />
          <SelectTagDlg
            anchorEl={anchorTag}
            closeDlg={closeTagDlg}
            accountId={accountId}
            setTags={appendTag}
          />
        </Box>
      )}
      <AlertDlg
        title={lang[locale].caution}
        caption={lang[locale].confirmToDiscard}
        dlgState={showDlg}
        closeDlg={closeAlertDialog}
      />
    </RightSidebar>
  );
};

export default CP;
