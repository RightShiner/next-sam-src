const { publicRuntimeConfig } = getConfig();
import _ from 'lodash';
import clsx from 'clsx';
import getConfig from 'next/config';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useMemo } from 'react';
import useState from 'react-usestateref';
import { Typography, Box, Button, Switch } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import toast from 'react-hot-toast';
import styles from './styles';
import DiscoveryTable from './DiscoveryTable';
import RecommendTable from './RecommendTable';
import PlanSelectDetail from './PlanSelectDetail';
import PlanChangeAlertDlg from './PlanChangeAlertDlg';
import { stripeService, planService } from 'services';

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function PlanSelect({
  userInfo,
  enterprise,
  advanced,
  performance,
  essentials,
  trial,
}) {
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, { defaultTheme: theme });
  }, [theme]);
  const classes = useStyles();
  const [isAnnualy, setMonth] = useState(true);
  const formatter = new Intl.NumberFormat(
    process.env.NEXT_PUBLIC_REGION == 'SG' ? 'sg-SG' : 'ja-JP',
    {
      style: 'currency',
      currency: process.env.NEXT_PUBLIC_REGION == 'SG' ? 'SGD' : 'JPY',
    },
  );

  const publishableKey = publicRuntimeConfig.stripePublicKey;
  const stripePromise = loadStripe(publishableKey);
  const [isLoading, setLoading] = useState(false);
  const [showDlg, setShowDlg] = useState(false);
  const [dlgData, setDlgData] = useState(null);
  const [selPlanType, setSelPlanType, plantypeRef] = useState('');
  const [showBlack, setShowBlack] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const closeAlertDlg = (val) => {
    setShowAlert(false);
    // if (val === false || plantypeRef.current === 'Enterprise')
    //   return;

    // showTransactionDlg();
  };

  const closeDialog = () => {
    setShowDlg(false);
  };

  const showTransactionDlg = () => {
    let direction = getPlanText(plantypeRef.current);
    if (direction === 'Upgrade') direction = true;
    else if (direction === 'Downgrade') direction = false;

    if (plantypeRef.current === 'Advanced')
      setDlgData({
        type: plantypeRef.current,
        isAnnualy: isAnnualy,
        plan: advanced,
        direction: direction,
      });
    else if (plantypeRef.current === 'Performance')
      setDlgData({
        type: plantypeRef.current,
        isAnnualy: isAnnualy,
        plan: performance,
        direction: direction,
      });
    else if (plantypeRef.current === 'Essentials')
      setDlgData({
        type: plantypeRef.current,
        isAnnualy: isAnnualy,
        plan: essentials,
        direction: direction,
      });
    else if (plantypeRef.current === 'Free trial')
      setDlgData({
        type: plantypeRef.current,
        isAnnualy: isAnnualy,
        plan: trial,
        direction: direction,
      });

    setShowDlg(true);
  };

  const transferToStrip = async (type, value) => {
    setLoading(true);

    let result = await planService
      .switchPlan(userInfo._id, type, value, isAnnualy)
      .then((response) => {
        if (response.status !== 'ok') return false;

        return true;
      })
      .catch((ex) => {
        console.log(ex.toString());
        return false;
      });

    if (result === false) {
      toast.error('プラン設定に失敗しました。');
      return;
    }

    const stripe = await stripePromise;

    // implement to backend
    if (type !== 'Free trial') {
      let description = '';
      if (type === 'Advanced') {
        description = 'ブランドの急速な進化';
      } else if (type === 'Performance') {
        description = 'ブランドの確かな成長';
      } else {
        description = 'マーケティングに必須';
      }

      const checkoutSessionId = await stripeService
        .createSession(
          {
            name: 'ASTREAM 支払い',
            description: description,
            quantity: 1,
            price: value,
          },
          type,
        )
        .then((response) => {
          if (response.status === 'ok') {
            return response.id;
          }
          return null;
        })
        .catch((ex) => {
          return null;
        });

      if (checkoutSessionId !== null) {
        const result = await stripe.redirectToCheckout({
          sessionId: checkoutSessionId,
        });
        if (result.error) {
          toast.error(result.error.message);
        }
      } else {
        toast.error('Stripeへの接続が失敗しました。');
      }
    }

    setLoading(false);
  };

  const connectToStripe = async (type) => {
    // setShowBlack(true);
    // setTimeout(function() {
    //   setShowBlack(false);
    // }, 5000);
    if (type === userInfo?.plantype) return;

    // setSelPlanType(type);
    // if (type === 'Free trial') {
    //   showTransactionDlg();
    //   return;
    // }

    setShowAlert(true);
  };

  const getPlanText = (type) => {
    if (!userInfo || !userInfo.plantype || userInfo.plantype === 'カスタム')
      return type;

    if (userInfo.plantype === type) return 'My plan';

    let plans = [
      'Enterprise',
      'Advanced',
      'Performance',
      'Essentials',
      'Free trial',
    ];
    let curIdx = _.findIndex(plans, (itm) => itm === type);
    let userIdx = _.findIndex(plans, (itm) => itm === userInfo.plantype);

    if (userIdx > curIdx) return 'Upgrade';
    return 'Downgrade';
  };

  return (
    <Box>
      {(!process.env.NEXT_PUBLIC_REGION ||
        process.env.NEXT_PUBLIC_REGION != 'SG') && (
        <Box>
          <Box>
            {showBlack && (
              <Box
                sx={{
                  whiteSpace: 'pre',
                  textAlign: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  width: '100%',
                  height: '420px',
                  position: 'absolute',
                  color: 'white',
                  paddingTop: '180px',
                  fontSize: '1.5rem',
                  zIndex: 999,
                }}
              >
                {
                  '現在「銀行振込」モードになっています。\r\nプランの変更はメール、もしくはチャットよりご連絡ください。'
                }
              </Box>
            )}
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography>半年契約</Typography>
                <Android12Switch
                  checked={isAnnualy}
                  onChange={(e) => setMonth(e.target.checked)}
                />
                <Typography>一年契約(15%OFF)</Typography>
              </Box>
              <Typography
                style={{
                  textAlign: 'center',
                  marginBottom: '.5rem',
                  fontSize: '.8rem',
                }}
              >
                ※Astreamでは「単月」単位の決済プランはご用意しておりません。
              </Typography>
            </Box>
            <Box
              className={clsx(
                classes.upgradeselect,
                classes.mt30,
                classes.mb10,
              )}
            >
              <Box
                className={clsx(
                  classes.upgradeplanitem,
                  userInfo?.plantype === 'Enterprise' ? 'upgradeselected' : '',
                )}
              >
                <Typography
                  className={clsx(
                    classes.upgradeplantitle,
                    classes.upgradeenterprise,
                  )}
                >
                  Enterprise
                </Typography>
                <Typography
                  className={classes.upgradeplandetail}
                  style={{
                    marginTop: '5.2rem',
                    marginBottom: 0,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {
                    '大規模な検索プランも\r\n用意できます\r\n気軽にお問合せください'
                  }
                </Typography>
                <Box className={classes.upgradeplanbutton}>
                  <Button
                    className={classes.upgradeenterprisebtn}
                    variant={'outlined'}
                    size="medium"
                    disabled={isLoading}
                    onClick={(e) => connectToStripe('Enterprise')}
                  >
                    問い合わせ
                  </Button>
                </Box>
              </Box>
              <Box
                className={clsx(
                  classes.upgradeplanitem,
                  userInfo?.plantype === 'Advanced' ? 'upgradeselected' : '',
                )}
              >
                <Typography
                  className={clsx(
                    classes.upgradeplantitle,
                    classes.upgradeadvanced,
                  )}
                >
                  Advanced
                </Typography>
                <Typography
                  className={classes.upgradeplandetail}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {'ブランドの急速な進化を\r\n(DB機能搭載・代理店向け)'}
                </Typography>
                <Box>
                  <Box className={classes.upgradeplanmoney}>
                    <span>
                      {formatter.format(
                        !isAnnualy
                          ? advanced.monthval ?? 0
                          : advanced.yearval ?? 0,
                      )}
                      <span className={classes.upgradelabel}>/月</span>
                    </span>
                  </Box>
                  {/* {isAnnualy && 
                <Box className={classes.upgradeplandivide}>
                  {`年間で${formatter.format(advanced.monthval ? (Math.floor(advanced.monthval * 0.8)) * 12 : 0)}の請求になります`}
                </Box>
              } */}
                </Box>
                <Box className={classes.upgradeplanbutton}>
                  <Button
                    className={classes.upgradeadvancedbtn}
                    variant={'outlined'}
                    size="medium"
                    disabled={isLoading}
                    onClick={(e) => connectToStripe('Advanced')}
                  >
                    {getPlanText('Advanced')}
                  </Button>
                </Box>
              </Box>
              <Box
                className={clsx(
                  classes.upgradeplanitem,
                  userInfo?.plantype === 'Performance' ? 'upgradeselected' : '',
                )}
              >
                <Typography
                  className={clsx(
                    classes.upgradeplantitle,
                    classes.upgradeperformance,
                  )}
                >
                  Performance
                </Typography>
                <Typography
                  className={classes.upgradeplandetail}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {'ブランドの確かな成長を\r\n(DB機能搭載・ブランド向け)'}
                </Typography>
                <Box>
                  <Box className={classes.upgradeplanmoney}>
                    <span>
                      {formatter.format(
                        !isAnnualy
                          ? performance.monthval ?? 0
                          : performance.yearval ?? 0,
                      )}
                      <span className={classes.upgradelabel}>/月</span>
                    </span>
                  </Box>
                  {/* {isAnnualy && 
                <Box className={classes.upgradeplandivide}>
                  {`年間で${formatter.format(performance.monthval ? (Math.floor(performance.monthval * 0.8)) * 12 : 0)}の請求になります`}
                </Box>
              } */}
                </Box>
                <Box className={classes.upgradeplanbutton}>
                  <Button
                    className={classes.upgradeperformancebtn}
                    variant={'outlined'}
                    size="medium"
                    disabled={isLoading}
                    onClick={(e) => connectToStripe('Performance')}
                  >
                    {getPlanText('Performance')}
                  </Button>
                </Box>
              </Box>
              <Box
                className={clsx(
                  classes.upgradeplanitem,
                  userInfo?.plantype === 'Essentials' ? 'upgradeselected' : '',
                )}
              >
                <Typography
                  className={clsx(
                    classes.upgradeplantitle,
                    classes.upgradeessentials,
                  )}
                >
                  Essentials
                </Typography>
                <Typography
                  className={classes.upgradeplandetail}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {'マーケティングに必須\r\n(個人向け)'}
                </Typography>
                <Box>
                  <Box className={classes.upgradeplanmoney}>
                    <span>
                      {formatter.format(
                        !isAnnualy
                          ? essentials.monthval ?? 0
                          : essentials.yearval ?? 0,
                      )}
                      <span className={classes.upgradelabel}>/月</span>
                    </span>
                  </Box>
                  {/* {isAnnualy && 
                <Box className={classes.upgradeplandivide}>
                  {`年間で${formatter.format(essentials.monthval ? (Math.floor(essentials.monthval * 0.8) * 12) : 0)}の請求になります`}
                </Box>
              } */}
                </Box>
                <Box className={classes.upgradeplanbutton}>
                  <Button
                    className={classes.upgradeessentialsbtn}
                    variant={'outlined'}
                    size="medium"
                    disabled={isLoading}
                    onClick={(e) => connectToStripe('Essentials')}
                  >
                    {getPlanText('Essentials')}
                  </Button>
                </Box>
              </Box>
              <Box
                className={clsx(
                  classes.upgradeplanitem,
                  userInfo?.plantype === 'Free trial' ? 'upgradeselected' : '',
                )}
              >
                <Typography
                  className={clsx(
                    classes.upgradeplantitle,
                    classes.upgradetrial,
                  )}
                >
                  Free trial
                </Typography>
                <Typography
                  className={classes.upgradeplandetail}
                  style={{
                    marginTop: '5.2rem',
                    marginBottom: 0,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {'最初の7日間限定の\r\nフリートライアルプラン'}
                </Typography>
                <Box className={classes.upgradeplanbutton}>
                  <Button
                    className={classes.upgradetrialbtn}
                    variant={'outlined'}
                    size="medium"
                    disabled={isLoading}
                    onClick={(e) => connectToStripe('Free trial')}
                  >
                    {getPlanText('Free trial')}
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box className={clsx(classes.mb40, classes.pr40)}>
              <Typography
                style={{
                  textAlign: 'right',
                  marginBottom: '.5rem',
                  fontSize: '.8rem',
                }}
              >
                ※表示価格は税抜き価格です。
              </Typography>
            </Box>
          </Box>
          <Box className={classes.mt30} data-aos={'fade-up'}>
            <DiscoveryTable
              isAnnualy={isAnnualy}
              enterprise={enterprise}
              advanced={advanced}
              performance={performance}
              essentials={essentials}
              trial={trial}
            />
            <RecommendTable />
          </Box>
          <PlanSelectDetail
            open={showDlg}
            handleClose={closeDialog}
            data={dlgData}
            transferToStrip={transferToStrip}
          />
          <PlanChangeAlertDlg dlgState={showAlert} closeDlg={closeAlertDlg} />
        </Box>
      )}
      {process.env.NEXT_PUBLIC_REGION == 'SG' && (
        <Box>
          <Box>
            {showBlack && (
              <Box
                sx={{
                  whiteSpace: 'pre',
                  textAlign: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  width: '100%',
                  height: '420px',
                  position: 'absolute',
                  color: 'white',
                  paddingTop: '180px',
                  fontSize: '1.5rem',
                  zIndex: 999,
                }}
              >
                {
                  '現在「銀行振込」モードになっています。\r\nプランの変更はメール、もしくはチャットよりご連絡ください。'
                }
              </Box>
            )}
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography>半年契約</Typography>
                <Android12Switch
                  checked={isAnnualy}
                  onChange={(e) => setMonth(e.target.checked)}
                />
                <Typography>一年契約</Typography>
              </Box>
              <Typography
                style={{
                  textAlign: 'center',
                  marginBottom: '.5rem',
                  fontSize: '.8rem',
                }}
              >
                ※Astreamでは「単月」単位の決済プランはご用意しておりません。
              </Typography>
            </Box>
            <Box
              className={clsx(
                classes.upgradeselect,
                classes.mt30,
                classes.mb10,
              )}
            >
              <Box
                className={clsx(
                  classes.upgradeplanitem,
                  classes.upgradeplanitemSg,
                  userInfo?.plantype === 'Unlimited' ? 'upgradeselected' : '',
                )}
              >
                <Typography
                  className={clsx(
                    classes.upgradeplantitle,
                    classes.upgradeperformance,
                  )}
                >
                  AS Unlimited
                </Typography>
                <Box>
                  <Box
                    className={clsx(classes.mt120, classes.upgradeplanmoney)}
                  >
                    <span>
                      {formatter.format(!isAnnualy ? 2388 : 1888)}
                      <span className={classes.upgradelabel}>/月</span>
                    </span>
                  </Box>
                </Box>
                <Box className={classes.upgradeplanbutton}>
                  <Button
                    className={classes.upgradeperformancebtn}
                    variant={'outlined'}
                    size="medium"
                    disabled={isLoading}
                    onClick={(e) => connectToStripe('AS Unlimited')}
                  >
                    {getPlanText('AS Unlimited')}
                  </Button>
                </Box>
              </Box>
              <Box
                className={clsx(
                  classes.upgradeplanitem,
                  classes.upgradeplanitemSg,
                  userInfo?.plantype === 'Basic' ? 'upgradeselected' : '',
                )}
              >
                <Typography
                  className={clsx(
                    classes.upgradeplantitle,
                    classes.upgradeessentials,
                  )}
                >
                  AS Basic
                </Typography>
                <Box>
                  <Box
                    className={clsx(classes.mt120, classes.upgradeplanmoney)}
                  >
                    <span>
                      {formatter.format(!isAnnualy ? 1448 : 1188)}
                      <span className={classes.upgradelabel}>/月</span>
                    </span>
                  </Box>
                </Box>
                <Box className={classes.upgradeplanbutton}>
                  <Button
                    className={classes.upgradeessentialsbtn}
                    variant={'outlined'}
                    size="medium"
                    disabled={isLoading}
                    onClick={(e) => connectToStripe('AS Basic')}
                  >
                    {getPlanText('AS Basic')}
                  </Button>
                </Box>
              </Box>
              <Box
                className={clsx(
                  classes.upgradeplanitem,
                  classes.upgradeplanitemSg,
                  userInfo?.plantype === 'Other' ? 'upgradeselected' : '',
                )}
              >
                <Typography
                  className={clsx(
                    classes.upgradeplantitle,
                    classes.upgradetrial,
                  )}
                >
                  Other
                </Typography>
                <Typography
                  className={classes.upgradeplandetail}
                  style={{
                    marginTop: '5.2rem',
                    marginBottom: 0,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {'1週間の無料トライアルをご用意しております。\r\n' +
                    '\r\n月途中の契約の場合は、初月は日割り、\r\n翌月からは11ヶ月の契約となります。\r\n\r\n' +
                    '\r\nお支払いは、GIROでの自動引き落としになります。\r\n初月のみ、お振込みをお願いします。'}
                </Typography>
                <Box className={classes.upgradeplanbutton}>
                  <Button
                    className={classes.upgradetrialbtn}
                    variant={'outlined'}
                    size="medium"
                    disabled={isLoading}
                    onClick={(e) => connectToStripe('Other')}
                  >
                    {getPlanText('Other')}
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box className={clsx(classes.mb40, classes.pr40)}>
              <Typography
                style={{
                  textAlign: 'right',
                  marginBottom: '.5rem',
                  fontSize: '.8rem',
                }}
              >
                ※表示価格は税抜き価格です。
              </Typography>
            </Box>
          </Box>
          <Box className={classes.mt30} data-aos={'fade-up'}>
            <DiscoveryTable
              isAnnualy={isAnnualy}
              enterprise={enterprise}
              advanced={advanced}
              performance={performance}
              essentials={essentials}
              trial={trial}
            />
          </Box>
          <PlanSelectDetail
            open={showDlg}
            handleClose={closeDialog}
            data={dlgData}
            transferToStrip={transferToStrip}
          />
          <PlanChangeAlertDlg dlgState={showAlert} closeDlg={closeAlertDlg} />
        </Box>
      )}
    </Box>
  );
}
