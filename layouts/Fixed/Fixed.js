import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { alpha, useTheme } from '@mui/material/styles';
import { useMediaQuery, Box, Typography, AppBar, Button } from '@mui/material';
import { MainContextWrapper } from 'context/MainContext';
import Container from './components/Container';
import { Topbar, Sidebar } from './components';
import pages from '../navigation-manager';
import CampaignIcon from '@mui/icons-material/Campaign';
import { announcementService } from 'services';
import Carousel from 'react-material-ui-carousel';

const Fixed = ({ userInfo, paidOnly, children, hideAnnouncement = false }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [collapsed, setCollapse] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [trial, setTrial] = useState(null);

  useEffect(() => {
    announcementService
      .getAnnouncements({ id: userInfo?.id ?? '' })
      .then((response) => {
        if (response.status !== 'ok') return;
        setAnnouncements(response.announcement);
      });
  }, []);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const showAlert = () => {
    if (!userInfo || !userInfo.plan) return false;
    // Free Trial なら true
    return userInfo.plan === 'Free trial';
  };

  const open = isMd ? false : openSidebar;
  const isShowAlert = showAlert();

  useEffect(() => {
    if (!userInfo || !userInfo.plan) {
      setTrial(null);
      return;
    }

    if (userInfo.plan !== 'Free trial') {
      setTrial(null);
      return;
    }

    let startDate = moment(userInfo.paystart);
    let endDate = moment(userInfo.payend);
    let curDate = moment(moment().format('YYYY-MM-DD'));
    let startDiff = startDate.diff(curDate, 'days');
    let endDiff = endDate.diff(curDate, 'days');

    setTrial({
      isTrialBetween: moment(curDate).isBetween(startDate, endDate, 'days', '[]'),
      startDiff,
      endDiff: endDiff < 0 ? 0 : endDiff});
  }, [userInfo])

  return (
    <MainContextWrapper>
      <Box>
        {!isMd && (
          <AppBar
            position={'fixed'}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
            elevation={0}
          >
            <Container maxWidth={1} paddingY={{ xs: 1, sm: 1.5 }}>
              <Topbar onSidebarOpen={handleSidebarOpen} />
            </Container>
          </AppBar>
        )}
        <Sidebar
          setCollapse={setCollapse}
          onClose={handleSidebarClose}
          open={open}
          variant={isMd ? 'permanent' : 'temporary'}
          pages={pages}
          collapsed={collapsed}
          userInfo={userInfo}
        />
        <main className="manager">
          <Box height={{ xs: 58, sm: 66, md: 0 }} />
          {isShowAlert !== false && (
            <Box
              sx={{
                textAlign: 'center',
                color: 'white',
                backgroundColor: '#816BF7',
                position: 'fixed',
                top: '0px',
                left: `${collapsed ? '50px' : '240px'}`,
                right: '0',
                padding: '.3rem',
                zIndex: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {trial && (
                    <>
                      {trial.startDiff > 0 ? (
                          <Typography style={{fontSize: '.8rem'}}>
                            無料トライアル開始まで残り{trial.startDiff}日お待ちください。
                          </Typography>
                      ) : (
                          <Typography style={{fontSize: '.8rem'}}>
                            無料トライアルは残り{trial.endDiff}
                            日間です。機能やデータ活用法に関してご不明点がございましたら、お気軽にチャットサポートをご活用ください。
                          </Typography>
                      )}
                    </>
                )}
              </Box>
            </Box>
          )}
          {!hideAnnouncement && announcements && announcements.length > 1 && (
            <Box
              sx={{
                textAlign: 'center',
                color: 'white',
                padding: '30px 70px',
                paddingLeft: `${collapsed ? '120px' : '310px'}`,
                zIndex: 2,
              }}
            >
              <Carousel
                interval={10000}
                duration={1000}
                sx={{ overflow: 'visible' }}
                autoPlay={true}
                cycleNavigation={true}
                navButtonsAlwaysVisible={true}
                navButtonsWrapperProps={{
                  style: {
                    height: 'unset',
                    top: 'unset',
                    bottom: '12px',
                    marginLeft: '-60px',
                    marginRight: '-60px',
                  },
                }}
                navButtonsProps={{
                  className: 'nav-button-announcement',
                }}
                indicatorIconButtonProps={{
                  style: {
                    display: 'none',
                  },
                }}
                activeIndicatorIconButtonProps={{
                  style: {
                    display: 'none',
                  },
                }}
              >
                {announcements.map((announcement, i) => (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 0.5rem',
                      backgroundColor: '#d5c6f9',
                      minHeight: '63px',
                      padding: '1em',
                      borderRadius: '0.4em',
                      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    {/* <CampaignIcon fontSize="small" /> */}
                    <Typography
                      style={{
                        marginLeft: '1em',
                        fontSize: '.8rem',
                        color: '#333',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        lineHeight: '1.5',
                      }}
                    >
                      {announcement.text}
                    </Typography>
                    {announcement.link !== '' && (
                      <Button
                        size="small"
                        className="secondary"
                        variant={'outlined'}
                        sx={{
                          marginLeft: '15px',
                          backgroundColor: '#865EE1',
                          color: '#ffffff',
                          borderColor: '#865EE1',
                          '&:hover': { borderColor: '#865EE1' },
                        }}
                        href={announcement.link}
                      >
                        さっそく試してみる
                      </Button>
                    )}
                  </Box>
                ))}
              </Carousel>
            </Box>
          )}
          {!hideAnnouncement && announcements && announcements.length == 1 && (
            <Box
              sx={{
                textAlign: 'center',
                color: 'white',
                padding: '30px 40px',
                minHeight: '63px',
                paddingLeft: `${collapsed ? '90px' : '280px'}`,
                zIndex: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 0.5rem',
                  backgroundColor: '#d5c6f9',
                  padding: '1em',
                  borderRadius: '0.4em',
                  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                }}
              >
                {/* <CampaignIcon fontSize="small" /> */}
                <Typography
                  style={{
                    marginLeft: '1em',
                    fontSize: '.8rem',
                    color: '#333',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    lineHeight: '1.5',
                  }}
                >
                  {announcements[0].text}
                </Typography>
                <Button
                  size="small"
                  className="secondary"
                  variant={'outlined'}
                  sx={{
                    marginLeft: '15px',
                    backgroundColor: '#865EE1',
                    color: '#ffffff',
                    borderColor: '#865EE1',
                    '&:hover': { borderColor: '#865EE1' },
                  }}
                  href={announcements[0].link}
                >
                  さっそく試してみる
                </Button>
              </Box>
            </Box>
          )}
          <Box
            display="flex"
            flex="1 1 auto"
            overflow="hidden"
            paddingLeft={{ md: collapsed ? '50px' : '240px' }}
          >
            <Box display="flex" flex="1 1 auto" overflow="hidden">
              <Box
                flex="1 1 auto"
                height="100%"
                overflow="auto"
                sx={{ minHeight: '100vh' }}
              >
                {(trial === null || paidOnly === false || (trial?.isTrialBetween && paidOnly === true)) && children}
                {trial !== null && !trial.isTrialBetween && paidOnly === true && (
                  <Container className="research content-wrapper">
                    <Box marginTop={3}>
                      {trial.startDiff > 0 ? (
                          <Typography gutterBottom>
                            無料トライアル開始までお待ちください。
                          </Typography>
                      ) : (
                          <Typography gutterBottom>
                            プランを購入してください。
                          </Typography>
                      )}
                    </Box>
                  </Container>
                )}
              </Box>
            </Box>
          </Box>
        </main>
        <Toaster
          position="top-right"
          reverseOrder={true}
          containerClassName="custom-toast-wrapper"
          toastOptions={{
            duration: 5000,
            style: {
              background: 'rgb(35, 80, 122)',
              color: '#fff',
              whiteSpace: 'pre-wrap',
              maxWidth: 'unset',
            },
          }}
        />
      </Box>
    </MainContextWrapper>
  );
};

Fixed.propTypes = {
  userInfo: PropTypes.object,
  children: PropTypes.node,
};

export default Fixed;
