/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Popover,
  Skeleton,
  Box,
  Button,
  Checkbox,
  Typography,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { accountService } from 'services';
import Lang from 'constants/lang';
import { useRouter } from 'next/router';

const lang = {
  en: {
    title: 'Subscribe to campaign list',
    create: 'Create new campaign',
  },
  jp: {
    title: 'キャンペーンリストに登録する',
    create: '新しいキャンペーン作成',
  },
};

export default function SaveDlg({
  anchorEl,
  closeDlg,
  infId,
  catType,
  avgViews = 0,
  setCampaign = undefined,
}) {
  const { locale } = useRouter();
  const [chkStatus, changeStatus] = useState({});
  const [campaigns, setChampaigns] = useState([]);
  const [isLoading, changeLoading] = useState(true);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (!anchorEl || !infId) {
      setKeyword('');
      changeLoading(false);
      return;
    }

    changeLoading(true);
    accountService
      .getCampaigns(infId, catType)
      .then((response) => {
        changeLoading(false);
        if (response.status !== 'ok') {
          changeStatus({});
          setChampaigns([]);
          return;
        }

        setChampaigns(response.data.campaigns);

        _.map(response.data.campaigns, (itm) => {
          const match = response.data.selected?.find(
            (selItm) => selItm === itm.id,
          );
          chkStatus[itm.id] = !!match;
        });

        changeStatus({ ...chkStatus });
      })
      .catch((err) => {
        changeLoading(false);
        changeStatus({});
        setChampaigns([]);
      });
  }, [anchorEl, infId]);

  const saveAccount = (campId, checkStatus, campName, tmpStatus) => {
    accountService
      .updateAmongCampiangs(
        infId,
        campId,
        checkStatus,
        catType,
        moment().format('YYYY-MM-DD'),
        avgViews,
      )
      .then((response) => {
        if (response.status !== 'ok') {
          toast.error(response.msg);
          return;
        }

        if (checkStatus) {
          toast.success(Lang.label.influencersaved);
          if (setCampaign) {
            setCampaign(campId, infId);
          }
        } else
          toast.success(
            locale == 'jp'
              ? `[${campName}]から除外しました`
              : `Removed from [${campName}]`,
          );

        changeStatus(tmpStatus);
      })
      .catch((err) => {
        toast.error(err.toString());
      });
  };

  const handleChange = (evt, campName) => {
    let tmpStatus = { ...chkStatus, [evt.target.name]: evt.target.checked };
    saveAccount(evt.target.name, evt.target.checked, campName, tmpStatus);
  };

  const getCampInfo = (campId) => {
    let camp = _.find(campaigns, (selItm) => selItm.id === campId);
    if (!camp) return '';

    return camp.name + '(' + camp.mems + ')';
  };

  const getCampName = (campId) => {
    let camp = _.find(campaigns, (selItm) => selItm.id === campId);
    if (!camp) return '';

    return camp.name;
  };

  const handleKeywordChange = (keyword) => {
    setKeyword(keyword);
  };

  return (
    <Popover
      className="savedlg_wrapper"
      id="simple-cover"
      open={anchorEl !== null}
      anchorEl={anchorEl}
      onClose={closeDlg}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <section className="saveDlg" onClick={(e) => e.stopPropagation()}>
        <Box className="up-triangle"></Box>
        <Box className="saveDlgToolbar">
          <Typography variant="h6">{lang[locale].title}</Typography>
          <Box className="saveDlgButtons">
            {/* {isLoading ? (
              <Skeleton width={30} height={30} sx={{transform:'unset'}}/>
            ) : (
              <SaveIcon fontSize="medium" className="closeIcon" onClick={e=>saveAccount()} />
            )} */}
            {isLoading ? (
              <Skeleton width={30} height={30} sx={{ transform: 'unset' }} />
            ) : (
              <CloseIcon
                fontSize="medium"
                className="closeIcon"
                onClick={(e) => closeDlg()}
              />
            )}
          </Box>
        </Box>
        <TextField
          size="small"
          value={keyword}
          onChange={(e) => handleKeywordChange(e.target.value)}
          autoFocus
          sx={{
            margin: '0 7px 10px',
          }}
        />
        {isLoading ? (
          <Skeleton width={'100%'} height={100} sx={{ transform: 'unset' }} />
        ) : (
          <ul className="contents">
            {_.map(
              chkStatus,
              (val, campId) =>
                getCampInfo(campId)
                  .toLowerCase()
                  .includes(keyword.toLowerCase()) && (
                  <li key={campId}>
                    {getCampInfo(campId)}
                    <Checkbox
                      name={campId}
                      checked={val}
                      onChange={(evt) => handleChange(evt, getCampName(campId))}
                      sx={{
                        color: '#A3DE97 !important',
                        '& .MuiSvgIcon-root': { fontSize: 24 },
                      }}
                    />
                  </li>
                ),
            )}
          </ul>
        )}
        <Box className="add-to-list">
          {isLoading ? (
            <Skeleton width={'100%'} height={50} sx={{ transform: 'unset' }} />
          ) : (
            <a href={'/campaign/new'} target="_blank">
              <Button className="create-list">
                <svg
                  fill="none"
                  height="32"
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                  className="create-list-plus"
                >
                  <path
                    fill="#9A83ED"
                    d="M16 2.67a13.34 13.34 0 1 0 .01 26.67A13.34 13.34 0 0 0 16 2.67zm5.33 14.66h-4v4c0 .74-.6 1.34-1.33 1.34-.73 0-1.33-.6-1.33-1.34v-4h-4c-.74 0-1.34-.6-1.34-1.33 0-.73.6-1.33 1.34-1.33h4v-4c0-.74.6-1.34 1.33-1.34.73 0 1.33.6 1.33 1.34v4h4c.74 0 1.34.6 1.34 1.33 0 .73-.6 1.33-1.34 1.33z"
                  ></path>
                </svg>
                <span>{lang[locale].create}</span>
              </Button>
            </a>
          )}
        </Box>
      </section>
    </Popover>
  );
}
