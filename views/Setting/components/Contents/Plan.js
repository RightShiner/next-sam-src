/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import moment from 'moment';
import clsx from 'clsx';
import NextLink from 'next/link';
import React, { useState, useEffect, useMemo } from 'react';
import { Skeleton, Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import RoundInfo from 'components/RoundInfo';
import { planService } from 'services';
import styles from './styles';
import { useRouter } from 'next/router';

const lang = {
  en: {
    title: 'My plan',
    change: 'Change plan',
    upgrade: 'Upgrading offers the following benefits.',
    influencer: 'Finding the right influencers',
    list: 'Efficiency with campaign list',
    info: 'Influencer follower information',
    insight: 'Effective Influencer Pickup with Insights List',
    growth: 'Influencer growth rate',
    key: 'Discovering important influencers through key account research',
    fake: 'Fake follower rate of influencers',
    marketing: 'Valuable news in influencer marketing',
    upgradePlan: 'Upgrade plan',
    question: 'Questions',
    to: 'to',
    available: 'Available',
    search: 'Page search',
    display: 'Report display',
    register: 'Campaign registration',
    month: 'If you want more monthly usage, you need to upgrade your plan.',
  },
  jp: {
    title: 'マイプラン',
    change: 'プラン変更',
    upgrade: 'アップグレードすると、以下のようなメリットがあります。',
    influencer: '最適なインフルエンサーの発見',
    list: 'キャンペーンリストによる効率化',
    info: 'インフルエンサーのフォロワー情報',
    insight: 'インサイトリストによる効果的なインフルエンサーのピックアップ',
    growth: 'インフルエンサーの成長率',
    key: 'キーアカウント調査による重要なインフルエンサーの発見',
    fake: 'インフルエンサーのフェイクフォロワー率',
    marketing: 'インフルエンサーマーケティングにおける貴重なニュース',
    upgradePlan: 'プランをアップグレードする',
    question: 'ご不明な点がある場合は',
    to: 'まで',
    available: '利用可能量',
    search: 'ページ検索',
    display: 'レポート表示',
    register: 'キャンペーン登録',
    month:
      '月間使用可能量を増やしたい場合は、プランをアップグレードする必要があります。',
  },
};

const Plan = ({ user, switchToUpgrade, ...rest }) => {
  const { locale } = useRouter();

  const formatterInt = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  });
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, { defaultTheme: theme });
  }, [theme]);
  const classes = useStyles();
  const curDate = moment().format('YYYY-MM-DD');
  const [isLoading, setLoadingStatus] = useState(false);
  const [usage, setUsage] = useState({});
  useEffect(() => {
    setLoadingStatus(true);
    return planService.getUsage(user.id).then((response) => {
      setUsage({
        ...response.data,
        paystart: response.startdate,
        payend: response.enddate,
      });
      setLoadingStatus(false);
    });
  }, []);

  const getPlanName = () => {
    if (!usage || !usage.plantype) return '';

    if (usage.plantype === 'カスタム') return usage.name;
    return usage.plantype;
  };

  return (
    <Box className="planWrapper" {...rest}>
      <Box className={clsx(classes.contentWrapper, classes.bigShadow)}>
        <Typography className={classes.boldFont} variant={'h5'}>
          {lang[locale].title}: {getPlanName()}
        </Typography>
        <Box className={classes.planSubtitle}>
          {usage &&
            usage.plantype === 'Free trial' &&
            (locale === 'en' ? (
              <Typography>
                Free trial plan will be end on&nbsp;
                <span style={{ fontWeight: '900' }}>
                  {usage.payend
                    ? moment(usage.payend).format('MMMM DD, YYYY')
                    : '〇/〇/〇/'}
                </span>
              </Typography>
            ) : (
              <Typography>
                Free trial プランは
                <span style={{ fontWeight: '900' }}>
                  {usage.payend
                    ? moment(usage.payend).format('YYYY年M月D日')
                    : '〇年〇月〇日'}
                </span>
                に終了します。
              </Typography>
            ))}
          {usage &&
            usage.plantype !== 'Free trial' &&
            usage.plantype !== 'カスタム' &&
            (locale === 'en' ? (
              <Typography>
                Your plan will be automatically renewed on
                <span style={{ fontWeight: '900' }}>
                  {usage.monthend
                    ? moment(usage.monthend).format('MMMM DD, YYYY')
                    : '〇/〇/〇/'}
                </span>
                and you will be charged&nbsp;
                <span style={{ fontWeight: '900' }}>
                  {usage.amount ? formatterInt.format(usage.amount) : '〇〇'}
                  &nbsp; yen
                </span>
              </Typography>
            ) : (
              <Typography>
                お客様のプランは
                <span style={{ fontWeight: '900' }}>
                  {usage.monthend
                    ? moment(usage.monthend).format('YYYY年M月D日')
                    : '〇年〇月〇日'}
                </span>
                に自動更新され、
                <span style={{ fontWeight: '900' }}>
                  {usage.amount ? formatterInt.format(usage.amount) : '〇〇'}円
                </span>
                が請求されます。
              </Typography>
            ))}
          {usage?.payend && curDate <= usage.payend && (
            <Button
              className={'active'}
              variant={'outlined'}
              size="medium"
              sx={{
                backgroundColor: '#9A83ED !important',
                borderColor: '#9A83ED !important',
              }}
              onClick={(e) => switchToUpgrade()}
            >
              {lang[locale].change}
            </Button>
          )}
        </Box>
        {usage?.payend && curDate > usage.payend ? (
          <Box
            className={clsx(classes.contentWrapper, classes.smallShadow)}
            sx={{
              backgroundColor: '#edf7fe !important',
              borderColor: '#6ebcf1 !important',
            }}
          >
            <Box className={clsx('qaSubWrapper', classes.mt50)}>
              <Typography className={clsx(classes.qaSubTitle, classes.mb20)}>
                {lang[locale].upgrade}
              </Typography>
              <Box className={classes.mb40}>
                <Box className={classes.upgradeprofilesummary}>
                  <Box className={classes.upgradeprofilesummarysub}>
                    <Box
                      component={'img'}
                      src={'/images/svgs/tick.svg'}
                      marginRight={1.5}
                    />
                    {lang[locale].influencer}
                  </Box>
                  <Box className={classes.upgradeprofilesummarysub}>
                    <Box
                      component={'img'}
                      src={'/images/svgs/tick.svg'}
                      marginRight={1.5}
                    />
                    {lang[locale].list}
                  </Box>
                </Box>
                <Box className={classes.upgradeprofilesummary}>
                  <Box className={classes.upgradeprofilesummarysub}>
                    <Box
                      component={'img'}
                      src={'/images/svgs/tick.svg'}
                      marginRight={1.5}
                    />
                    {lang[locale].info}
                  </Box>
                  <Box className={classes.upgradeprofilesummarysub}>
                    <Box
                      component={'img'}
                      src={'/images/svgs/tick.svg'}
                      marginRight={1.5}
                    />
                    {lang[locale].insight}
                  </Box>
                </Box>
                <Box className={classes.upgradeprofilesummary}>
                  <Box className={classes.upgradeprofilesummarysub}>
                    <Box
                      component={'img'}
                      src={'/images/svgs/tick.svg'}
                      marginRight={1.5}
                    />
                    {lang[locale].growth}
                  </Box>
                  <Box className={classes.upgradeprofilesummarysub}>
                    <Box
                      component={'img'}
                      src={'/images/svgs/tick.svg'}
                      marginRight={1.5}
                    />
                    {lang[locale].key}
                  </Box>
                </Box>
                <Box className={classes.upgradeprofilesummary}>
                  <Box className={classes.upgradeprofilesummarysub}>
                    <Box
                      component={'img'}
                      src={'/images/svgs/tick.svg'}
                      marginRight={1.5}
                    />
                    {lang[locale].fake}
                  </Box>
                  <Box className={classes.upgradeprofilesummarysub}>
                    <Box
                      component={'img'}
                      src={'/images/svgs/tick.svg'}
                      marginRight={1.5}
                    />
                    {lang[locale].marketing}
                  </Box>
                </Box>
                <Box sx={{ paddingLeft: '30px', paddingTop: '5px' }}>
                  <Button
                    sx={{ marginTop: '1rem' }}
                    className="active"
                    autoFocus
                  >
                    <NextLink href="/setting" passHref>
                      <a style={{ textDecoration: 'none', color: 'white' }}>
                        {lang[locale].upgradePlan}
                      </a>
                    </NextLink>
                  </Button>
                </Box>
                <Box sx={{ paddingLeft: '30px', paddingTop: '15px' }}>
                  {lang[locale].question}
                  <a
                    href="maleto:astream@acetokyo.co"
                    style={{ textDecoration: 'none' }}
                  >
                    astream@acetokyo.co
                  </a>
                  m{lang[locale].to}
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box className={clsx(classes.contentWrapper, classes.smallShadow)}>
            <Typography className={clsx(classes.boldFont, classes.mb30)}>
              {lang[locale].available}
            </Typography>
            <Box>
              <Box className={clsx(classes.planGrid, classes.mb20)}>
                <Box className={classes.planDetail}>
                  <span>{lang[locale].search}</span>
                  {/* <RoundInfo marginLeft={1} /> */}
                </Box>
                {isLoading ? (
                  <Skeleton
                    width={'100%'}
                    height={20}
                    sx={{ transform: 'unset' }}
                  />
                ) : (
                  <>
                    <Typography
                      className={classes.planUsageText}
                    >{`${usage.pagesuse} of ${usage.pagesplan}`}</Typography>
                    <Box className={classes.planUsageWrapper}>
                      <Box
                        className={classes.planUsage}
                        sx={{
                          width: `${
                            usage.pagesplan > 0
                              ? (usage.pagesuse / usage.pagesplan) * 100
                              : 100
                          }%`,
                        }}
                      />
                    </Box>
                  </>
                )}
              </Box>
              <Box className={clsx(classes.planGrid, classes.mb20)}>
                <Box className={classes.planDetail}>
                  <span>{lang[locale].display}</span>
                  {/* <RoundInfo marginLeft={1} /> */}
                </Box>
                {isLoading ? (
                  <Skeleton
                    width={'100%'}
                    height={20}
                    sx={{ transform: 'unset' }}
                  />
                ) : (
                  <>
                    <Typography
                      className={classes.planUsageText}
                    >{`${usage.profiesuse} of ${usage.profiesplan}`}</Typography>
                    <Box className={classes.planUsageWrapper}>
                      <Box
                        className={classes.planUsage}
                        sx={{
                          width: `${
                            usage.profiesplan > 0
                              ? (usage.profiesuse / usage.profiesplan) * 100
                              : 100
                          }%`,
                        }}
                      />
                    </Box>
                  </>
                )}
              </Box>
              {/* <Box className={clsx(classes.planGrid, classes.mb20)}>
                <Box className={classes.planDetail}>
                  <span>フルレポート</span>
                </Box>
                {isLoading ? (
                  <Skeleton width={'100%'} height={20} sx={{transform:'unset'}}/>
                ) : (
                  <>
                    <Typography className={classes.planUsageText}>{`${usage.reportsuse} of ${usage.reportsplan}`}</Typography>
                    <Box 
                      className={classes.planUsageWrapper}
                    >
                      <Box 
                        className={classes.planUsage}
                        sx={{width: `${usage.reportsplan > 0 ? usage.reportsuse / usage.reportsplan * 100 : 100}%`}}
                      />
                    </Box>
                  </>
                )}
              </Box> */}
              <Box className={clsx(classes.planGrid, classes.mb20)}>
                <Box className={classes.planDetail}>
                  <span>CSV</span>
                  {/* <RoundInfo marginLeft={1} /> */}
                </Box>
                {isLoading ? (
                  <Skeleton
                    width={'100%'}
                    height={20}
                    sx={{ transform: 'unset' }}
                  />
                ) : (
                  <>
                    <Typography
                      className={classes.planUsageText}
                    >{`${usage.csvuse} of ${usage.csvplan}`}</Typography>
                    <Box className={classes.planUsageWrapper}>
                      <Box
                        className={classes.planUsage}
                        sx={{
                          width: `${
                            usage.csvplan > 0
                              ? (usage.csvuse / usage.csvplan) * 100
                              : 100
                          }%`,
                        }}
                      />
                    </Box>
                  </>
                )}
              </Box>
              <Box className={clsx(classes.planGrid, classes.mb20)}>
                <Box className={classes.planDetail}>
                  <span>{lang[locale].register}</span>
                  {/* <RoundInfo marginLeft={1} /> */}
                </Box>
                {isLoading ? (
                  <Skeleton
                    width={'100%'}
                    height={20}
                    sx={{ transform: 'unset' }}
                  />
                ) : (
                  <>
                    <Typography
                      className={classes.planUsageText}
                    >{`${usage.savesuse} of ${usage.savesplan}`}</Typography>
                    <Box className={classes.planUsageWrapper}>
                      <Box
                        className={classes.planUsage}
                        sx={{
                          width: `${
                            usage.savesplan > 0
                              ? (usage.savesuse / usage.savesplan) * 100
                              : 100
                          }%`,
                        }}
                      />
                    </Box>
                  </>
                )}
              </Box>
              <Box>
                <Box className={classes.planDetail}>
                  {usage?.plantype === 'Free trial' ? (
                    <span>{lang[locale].month}</span>
                  ) : locale === 'en' ? (
                    <span>
                      {`Monthly usage will reset ${moment(usage.monthend).diff(
                        moment(),
                        'days',
                      )} days later on ${moment(usage.monthend).format(
                        'MMMM DD, YYYY',
                      )}`}
                    </span>
                  ) : (
                    <span>
                      {`月間使用可能量は${moment(usage.monthend).diff(
                        moment(),
                        'days',
                      )}日後の${moment(usage.monthend).format(
                        'YYYY年MM月DD日',
                      )}にリセットされます。`}
                    </span>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {/* <Typography
          sx={{
            marginTop: '20px',
            fontSize: '0.8rem'
          }}
        >
          To temporarily pause your subscription for up to 3 months, click <NextLink href="#">here</NextLink>. This is best for service providers with an unpredictable project timeline.
        </Typography> */}
      </Box>
    </Box>
  );
};

export default Plan;
