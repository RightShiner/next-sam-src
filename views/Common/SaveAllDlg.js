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
  jp: {
    errorNoInfluencerToBulkRegister:
      '一括登録するインフルエンサーがありません。',
    registering: '現在登録中です、お待ちください',
    unregistering: '現在除外中です、お待ちください',
    dateFormat: 'YYYY-MM-DD',
    saveToCampaign: 'キャンペーンリストに登録する',
    newCampaign: '新しいキャンペーン作成',
  },
  en: {
    errorNoInfluencerToBulkRegister: 'No influencer to save to campaign',
    registering: 'Applying...',
    unregistering: 'Applying...',
    dateFormat: 'MMM DD, YYYY',
    saveToCampaign: 'Save to campaign',
    newCampaign: 'New Campaign',
  },
};

export default function SaveAllDlg({
  influencers,
  anchorEl,
  closeDlg,
  catType,
  setCampaign = undefined,
}) {
  const { locale } = useRouter();
  const [chkStatus, changeStatus] = useState({});
  const [isLoading, changeLoading] = useState(true);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (!anchorEl) {
      changeLoading(false);
      return;
    }

    changeLoading(true);
    accountService
      .getAllCampaigns(catType)
      .then((response) => {
        changeLoading(false);
        if (response.status !== 'ok') return;

        let tempStatus = {};
        _.map(response.data, ({ id, name, mems }) => {
          tempStatus[id] = { name, mems, status: false };
        });

        changeStatus({ ...tempStatus });
      })
      .catch((err) => {
        changeLoading(false);
        changeStatus({});
      });
  }, [anchorEl]);

  const saveAccount = (campId, campName, checkStatus, tmpStatus) => {
    let infIds = influencers.map((itm) => {
      return itm.userId;
    });

    let avgViews = influencers.map((itm) => {
      return itm.profile?.averageViews ?? 0;
    });

    if (infIds.length < 1) {
      toast.error(lang[locale].errorNoInfluencerToBulkRegister);
      return;
    }

    const loadingId = toast.loading(
      checkStatus ? lang[locale].registering : lang[locale].unregistering,
      {
        duration: 100 * 1000,
      },
    );

    accountService
      .updateAllAmongCampiangs(
        infIds,
        avgViews,
        campId,
        checkStatus,
        catType,
        moment().format(lang[locale].dateFormat),
      )
      .then((response) => {
        if (response.status !== 'ok') {
          toast.remove(loadingId);
          toast.error(response.msg);
          return;
        }

        if (checkStatus) {
          toast.remove(loadingId);
          if (setCampaign) setCampaign(campId, infIds);

          toast.success(Lang.label.influencersaved);
        } else {
          toast.remove(loadingId);
          toast.success(
            locale == 'jp'
              ? `[${campName}]から除外しました。`
              : `Successfully removed from [${campName}].`,
          );
        }

        changeStatus(tmpStatus);
      })
      .catch((err) => {
        toast.remove(loadingId);
        toast.error(err.toString());
      });
  };

  const handleChange = (evt, campName) => {
    const campId = evt.target.name;
    const orgItm = _.get(chkStatus, campId);
    let tmpStatus = {
      ...chkStatus,
      [campId]: { ...orgItm, status: evt.target.checked },
    };

    saveAccount(campId, campName, evt.target.checked, tmpStatus);
  };

  const handleKeywordChange = (input) => {
    setKeyword(input);
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
          <Typography variant="h6">{lang[locale].saveToCampaign}</Typography>
          <Box className="saveDlgButtons">
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
                val.name.toLowerCase().includes(keyword.toLowerCase()) && (
                  <li key={campId}>
                    {`${val.name} (${val.mems})`}
                    <Checkbox
                      name={campId}
                      checked={val.status}
                      onChange={(evt) => handleChange(evt, val.name)}
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
                <span>{lang[locale].newCampaign}</span>
              </Button>
            </a>
          )}
        </Box>
      </section>
    </Popover>
  );
}
