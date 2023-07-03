import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useMainContext } from 'context/MainContext';
import RightSidebar from 'components/RightSidebar';
import Header from './Brief/Header';
import InfluencerDetail from './InfluencerDetail';
import InfluencerBriefLoading from './InfluencerBriefLoading';
import { modashService, astreamService } from 'services';
import toast from 'react-hot-toast';
import Constants from 'constants/constants';
import InfluencerBriefYoutube from './Brief/InfluencerBriefYoutube';
import InfluencerBriefInstagram from './Brief/InfluencerBriefInstagram';
import InfluencerBriefTiktok from './Brief/InfluencerBriefTiktok';
import InfluencerBriefOverflow from './Brief/InfluencerBriefOverflow';
import OverflowDlg from './Brief/OverflowDlg';
import { useRouter } from 'next/router';

const lang = {
  en: {
    title: 'The monthly available amount for profile display has become 0!',
    content:
      'Please wait for the monthly usage reset date. If you want to use the profile display immediately, upgrade your plan and the monthly usage amount will be added.',
    action: 'Upgrade plan',
  },
  jp: {
    title: 'プロフィール表示の月間使用可能量が0になりました！',
    content:
      '月間使用可能量のリセット日をお待ちください。すぐにプロフィール表示をご利用になられたい場合はプランをアップグレード頂くと月間使用可能量が追加されます。',
    action: 'プランをアップグレードする',
  },
};

const InfluencerBrief = ({ research, userInfo }) => {
  const { locale } = useRouter();
  const {
    setInfluencerCollapsable,
    isInfluCollapse,
    selectedInfluencer,
  } = useMainContext();
  const [isLoading, setLoading] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [data, setData] = useState(null);
  const [feed, setFeed] = useState(null);
  const [reels, setReels] = useState(null);
  const [stories, setStories] = useState(null);
  const [openDlg, setOpenDialog] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const [isFullReport, setIsFullReport] = useState(true);
  const [showOverflow, setShowOverflow] = useState(false);
  const closeOverflow = (status) => {
    setShowOverflow(false);
  };

  const openDialog = async () => {
    const isAvailable = await modashService
      .getProfileOverview()
      .then((response) => {
        if (response.status !== 'ok') {
          toast.error(response.msg);
          return false;
        }

        return true;
      })
      .catch((msg) => {
        toast.error(msg.toString());
        return false;
      });

    if (isAvailable) setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const updateData = async () => {
    setUpdating(true);
    return modashService
      .updateProfileData(
        selectedInfluencer.id,
        selectedInfluencer.type,
        selectedInfluencer.avgViews,
      )
      .then((response) => {
        setUpdating(false);
        if (response.status !== 'ok') {
          toast.error(response.msg);
          return;
        }

        setData(response.data);
      })
      .catch((msg) => {
        setUpdating(false);
        toast.error(msg.toString());
      });
  };

  useEffect(() => {
    if (isInfluCollapse === true || selectedInfluencer === null) return;

    setLoading(true);
    return modashService
      .getProfileReport(
        selectedInfluencer.id,
        selectedInfluencer.type,
        selectedInfluencer.avgViews,
      )
      .then((response) => {
        if (response.status === 'ok') {
          if (response.overflow) {
            setIsOverflow(true);
            if (response.showalert === true) setShowOverflow(true);
          } else {
            setIsOverflow(false);
            setIsFullReport(response.report);
          }

          setData(response.data);

          if (selectedInfluencer.type == Constants.snsInstagram) {
            setFeed(null);
            astreamService
              .getInstagramFeed(selectedInfluencer.username)
              .then((response) => {
                setFeed(response);
              });

            setReels(null);
            astreamService
              .getInstagramReels(selectedInfluencer.username)
              .then((response) => {
                setReels(response);
              });

            setStories(null);
            astreamService
              .getInstagramStories(selectedInfluencer.username)
              .then((response) => {
                setStories(response);
              });
          }

          setLoading(false);
          return;
        }

        setLoading(false);
        setData(null);
        // if (response.msg == 'プロフィール表示数がオーバーしました。') {
        //   if (response.showalert === true)
        //     setShowOverflow(true);
        //   setIsOverflow(true);
        // }
        // setLoading(false);
        // setData(null);
      })
      .catch((msg) => {
        setLoading(false);
        setData(null);
        // setData({
        //   avatar: 'https://imgigp.modash.io/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDY9ylLT5c6L8M5YYtkm82Y2DDgAk%2BlFE0f8CghKo5%2FCKHnrwHpFJsVwOsLT2HHY58qvvB2REevWri5e5dDWGq%2BUrC4M4BvvnB6Aeuo02N6AJw%3D%3D',
        //   name: 'Cristano ronaldo',
        //   instagram: 'https://www.instagram.com/instagram',
        //   followers: 58473948,
        //   engage: 39582,
        //   per: 0.54
        // });
        toast.error(msg);
      });
  }, [selectedInfluencer, isInfluCollapse]);

  return (
    <RightSidebar>
      <OverflowDlg dlgState={showOverflow} closeDlg={closeOverflow} />
      {!isInfluCollapse &&
        (isLoading ? (
          <InfluencerBriefLoading />
        ) : (
          <Box className="influencer-brief">
            <Box className="influencer-toolbar">
              <Button
                className="close"
                onClick={(evt) => setInfluencerCollapsable(true)}
              >
                <CloseIcon fontSize="small" />
              </Button>
              {/*
            <Button className='save'>
              <svg fill="none" height="16" width="16" xmlns="http://www.w3.org/2000/svg" >
                <path d="M12.67 12l1.33.67V2c0-.73-.6-1.33-1.33-1.33H5.99c-.73 0-1.32.6-1.32 1.33h6.66c.74 0 1.34.6 1.34 1.33V12zM10 3.33H3.33C2.6 3.33 2 3.93 2 4.67v10.66l4.67-2 4.66 2V4.67c0-.74-.6-1.34-1.33-1.34z"></path>
              </svg>
              <span>保存</span>
            </Button>
            */}
            </Box>
            {isOverflow && (
              <>
                <Header
                  research={research}
                  userInfo={userInfo}
                  isFullReport={isFullReport}
                  lastUpdated={data.lastUpdated}
                  data={data.profile}
                  userId={data.userId}
                  type={selectedInfluencer ? selectedInfluencer.type : ''}
                  handleOpen={openDialog}
                  handleUpdate={updateData}
                  isUpdating={isUpdating}
                  contacts={data.contacts}
                />
                <InfluencerBriefOverflow data={data} />
                <Box style={{ margin: '1rem' }}>
                  <Typography style={{ fontSize: '.9rem' }}>
                    {lang[locale].title}
                  </Typography>
                  <Typography style={{ marginTop: '1rem', fontSize: '.8rem' }}>
                    {lang[locale].content}
                  </Typography>
                  <Button
                    sx={{ marginTop: '1rem' }}
                    className="active"
                    autoFocus
                  >
                    <NextLink href="/setting" passHref>
                      <a style={{ textDecoration: 'none', color: 'white' }}>
                        {lang[locale].action}
                      </a>
                    </NextLink>
                  </Button>
                </Box>
              </>
            )}
            {!isOverflow && data !== null && (
              <Box>
                <Header
                  research={research}
                  userInfo={userInfo}
                  isFullReport={isFullReport}
                  lastUpdated={data.lastUpdated}
                  data={data.profile}
                  userId={data.userId}
                  type={selectedInfluencer ? selectedInfluencer.type : ''}
                  handleOpen={openDialog}
                  handleUpdate={updateData}
                  isUpdating={isUpdating}
                  contacts={data.contacts}
                />

                {selectedInfluencer.type === Constants.snsInstagram && (
                  <InfluencerBriefInstagram data={data} />
                )}
                {selectedInfluencer.type === Constants.snsYoutube && (
                  <InfluencerBriefYoutube data={data} />
                )}
                {selectedInfluencer.type === Constants.snsTiktok && (
                  <InfluencerBriefTiktok data={data} />
                )}

                <InfluencerDetail
                  open={openDlg}
                  handleClose={closeDialog}
                  data={data}
                  feed={feed}
                  reels={reels}
                  igtv={stories}
                />
              </Box>
            )}
          </Box>
        ))}
    </RightSidebar>
  );
};

InfluencerBrief.defaultProps = {
  research: false,
};

export default InfluencerBrief;
