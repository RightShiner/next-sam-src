import { React, useState, useEffect } from 'react';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { makeStyles } from '@mui/styles';
import { Box, Button, Skeleton, TextField } from '@mui/material';
import RoundInfo from 'components/RoundInfo';
import RelativeImage from 'components/RelativeImage';
import Constants from 'constants/constants';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { memoService } from 'services';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: 'rgba(0, 0, 0, 0.8)',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
}));

const useStyles = makeStyles({
  lazyBorderRound: {
    borderRadius: '50%',
  },
});

const getYoutubeContact = (infos, type) => {
  const matchedContact = infos.find((itm) => itm.type === type);
  return matchedContact ? matchedContact.value : null;
};

const lang = {
  en: {
    success: 'Saved the note.',
    contactAvailable: 'Contact information available',
    contactNoAvailable: 'No contact information',
    caption:
      'Contact information will be displayed when outputting in "CSV" on the list up page of the campaign list.',
    buttonReport: 'View full report',
    buttonTitle:
      'You have reached the limit of full report confirmations! You have reached the maximum number of full report checks set in your plan. If you would like to continue using it, please upgrade your plan or contact the Astream team via chat or email.',
    updateDate: 'Update date',
    update: 'Update',
    memo: 'Memo',
    save: 'Save',
  },
  jp: {
    success: 'メモを保存しました。',
    contactAvailable: 'コンタクト情報あり',
    contactNoAvailable: 'コンタクト情報なし',
    caption:
      'コンタクト情報はキャンペーンリストのリストアップページにて「CSV」で出力した際に表示されます。',
    buttonReport: 'フルレポートを表示',
    buttonTitle:
      'フルレポート確認の上限に達しました！\r\nあなたのプランで設定されているフルレポート確認の上限数に達しました。引き続きの利用をご希望の場合は、プランをアップグレ―ドするか、Astreamチームにチャットやメールで相談してください。',
    updateDate: '更新日',
    update: '更新',
    memo: 'メモ',
    save: 'Save',
  },
};

const Header = ({
  research,
  userInfo,
  isFullReport,
  data,
  userId,
  type,
  handleOpen,
  isUpdating,
  handleUpdate,
  lastUpdated,
  contacts,
}) => {
  const { locale } = useRouter();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(async () => {
    if (!research) {
      return;
    }
    const metaData = {
      userId: userInfo.id,
      influencerId: userId,
      type,
    };
    setLoading(true);
    let memo = await memoService.getMemo(metaData);
    setValue(memo.data?.content);
    setLoading(false);
  }, []);

  const saveMemo = async (val) => {
    const metaData = {
      userId: userInfo.id,
      influencerId: userId,
      type,
      val,
    };
    return memoService
      .setMemo(metaData)
      .then((response) => {
        if (response.status !== 'ok') {
          toast.error(response.msg);
          return;
        } else {
          toast.success(lang[locale].success);
        }
      })
      .catch((msg) => {
        toast.error(response.msg);
      });
  };

  return (
    <Box className="header">
      <RelativeImage
        isRound
        imgSrc={data?.picture ?? Constants.blurImage}
        sx={{ width: '150px !important', height: '150px !important' }}
      />
      <Box className="mgt10">
        <span style={{ fontSize: '20px', fontWeight: 600 }}>
          {data.fullname}
        </span>
      </Box>
      <Box className="mgt10" sx={{ display: 'flex', alignItems: 'center' }}>
        {contacts && contacts.length > 0 ? (
          <svg
            height="10"
            width="14"
            fill="none"
            viewBox="0 0 24 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#000"
              d="M21 5V4L18 6L15 4V5L17.72 6.82C17.89 6.93 18.11 6.93 18.27 6.82L21 5ZM22 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H22C23.1 18 23.99 17.1 23.99 16L24 2C24 0.9 23.1 0 22 0ZM8 3C9.66 3 11 4.34 11 6C11 7.66 9.66 9 8 9C6.34 9 5 7.66 5 6C5 4.34 6.34 3 8 3ZM14 15H2V14C2 12 6 10.9 8 10.9C10 10.9 14 12 14 14V15ZM21.5 9H14.5C14.22 9 14 8.78 14 8.5V3.5C14 3.22 14.22 3 14.5 3H21.5C21.78 3 22 3.22 22 3.5V8.5C22 8.78 21.78 9 21.5 9Z"
            ></path>
          </svg>
        ) : (
          <DoDisturbAltIcon />
        )}
        <span className="mgl5">
          {`${
            contacts && contacts.length > 0
              ? lang[locale].contactAvailable
              : lang[locale].contactNoAvailable
          }`}
        </span>
        <RoundInfo className="mgl5" caption={lang[locale].caption} />
      </Box>
      {type === Constants.snsInstagram && (
        <>
          <a
            href={data.url}
            rel="noopener noreferrer"
            target="_blank"
            className="contract-wrapper"
          >
            <Box
              className="mgr5"
              component={'img'}
              effect="blur"
              src={'/images/svgs/instagram.svg'}
              width={'16px'}
              height={'16px'}
            />
            <span className="influencer-header-name">
              {data.username ? '@' + data.username : data.fullname}
            </span>
          </a>
          {getYoutubeContact(contacts, 'youtube') && (
            <a
              href={getYoutubeContact(contacts, 'youtube')}
              rel="noopener noreferrer"
              target="_blank"
              className="contract-wrapper"
            >
              <Box
                className="mgr5"
                component={'img'}
                effect="blur"
                src={'/images/svgs/youtube.svg'}
                width={'16px'}
                height={'16px'}
              />
              <span className="influencer-header-name">Youtube</span>
            </a>
          )}
        </>
      )}
      {type === Constants.snsYoutube && (
        <>
          <a
            href={'https://www.youtube.com/channel/' + userId}
            rel="noopener noreferrer"
            target="_blank"
            className="contract-wrapper"
          >
            <Box
              className="mgr5"
              component={'img'}
              effect="blur"
              src={'/images/svgs/youtube.svg'}
              width={'16px'}
              height={'16px'}
            />
            <span className="influencer-header-name">
              {data.username ? '@' + data.username : data.fullname}
            </span>
          </a>
          {getYoutubeContact(contacts, 'instagram') && (
            <a
              href={getYoutubeContact(contacts, 'instagram')}
              rel="noopener noreferrer"
              target="_blank"
              className="contract-wrapper"
            >
              <Box
                className="mgr5"
                component={'img'}
                effect="blur"
                src={'/images/svgs/instagram.svg'}
                width={'16px'}
                height={'16px'}
              />
              <span className="influencer-header-name">Instagram</span>
            </a>
          )}
        </>
      )}
      {type === Constants.snsTiktok && (
        <>
          <a
            href={'https://www.tiktok.com/@' + data.username}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Box
              className="mgr5"
              component={'img'}
              effect="blur"
              src={'/images/svgs/tiktok.svg'}
              width={'12px'}
              height={'15px'}
            />
            <span className="influencer-header-name">
              {data.username ? '@' + data.username : data.fullname}
            </span>
          </a>
          {getYoutubeContact(contacts, 'instagram') && (
            <a
              href={getYoutubeContact(contacts, 'instagram')}
              rel="noopener noreferrer"
              target="_blank"
              className="contract-wrapper"
            >
              <Box
                className="mgr5"
                component={'img'}
                effect="blur"
                src={'/images/svgs/instagram.svg'}
                width={'16px'}
                height={'16px'}
              />
              <span className="influencer-header-name">Instagram</span>
            </a>
          )}
        </>
      )}
      {isFullReport ? (
        <Button
          onClick={(e) => handleOpen()}
          className="manager active mgt20 button-base-inline"
          variant={'outlined'}
        >
          {lang[locale].buttonReport}
        </Button>
      ) : (
        <BootstrapTooltip
          sx={{ whiteSpace: 'pre-wrap' }}
          title={lang[locale].buttonTitle}
          placement="bottom"
        >
          <Button
            className="mgt20 button-base-inline"
            variant={'outlined'}
            sx={{
              border: '1px solid #666 !important',
              backgroundColor: '#cdcdcd !important',
              color: '#999 !important',
            }}
          >
            {lang[locale].buttonReport}
          </Button>
        </BootstrapTooltip>
      )}
      {false && (
        <Box
          className="mgt20"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          <span
            style={{ fontSize: '.8rem', color: 'gray', marginRight: '1rem' }}
          >
            {lang[locale].updateDate}:
            {moment(lastUpdated).format('YYYY年M月D日')}
          </span>
          {isUpdating ? (
            <Skeleton width={80} height={30} sx={{ transform: 'unset' }} />
          ) : (
            <Button
              disabled={!isFullReport}
              onClick={(e) => handleUpdate()}
              className="button-base-inline"
              variant={'outlined'}
            >
              {lang[locale].update}
            </Button>
          )}
        </Box>
      )}
      {research && userInfo?.id == '620f41d5fc9e8deb0c16573e' && (
        <Box
          className="mgt20"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
            paddingLeft: '3rem',
            paddingRight: '1rem',
          }}
        >
          {!loading ? (
            <TextField
              id="outlined-multiline-static"
              placeholder={lang[locale].memo}
              multiline
              rows={4}
              sx={{ ml: '2', width: '16em' }}
              value={value}
              onChange={handleChange}
            />
          ) : (
            <Skeleton
              width={'16em'}
              height={'125px'}
              sx={{ transform: 'unset' }}
            />
          )}
          <Box>
            <Button
              disabled={!isFullReport}
              onClick={(e) => saveMemo(value)}
              className="manager active mgt20 button-base-inline"
              variant={'outlined'}
            >
              {lang[locale].save}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Header;
