/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Popover,
  Skeleton,
  Box,
  Button,
  Checkbox,
  Select,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { accountService } from 'services';
import { TagColors } from 'constants/constants';
import { useRouter } from 'next/router';

const lang = {
  jp: {
    errorNoTagName: 'タグが入力されていません。',
    errorNoColorSelected: 'カラーを指定してください。',
    errorDuplicateTagName: '同じ名前のタグは追加できません。',
    successAddTag: 'タグを追加しました。',
    addTag: 'タグを登録する',
    tagName: '追加するタグ名称',
  },
  en: {
    errorNoTagName: 'No tag name.',
    errorNoColorSelected: 'No color selected.',
    errorDuplicateTagName: 'Duplicate tag name.',
    successAddTag: 'Successfully added tag.',
    addTag: 'Add Tag',
    tagName: 'TagName',
  },
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
    },
  },
};

export default function SaveDlg({ anchorEl, closeDlg, accountId, setTags }) {
  const { locale } = useRouter();
  const [chkStatus, changeStatus] = useState({});
  const [tags, setOrgTags] = useState([]);
  const [isLoading, changeLoading] = useState(true);
  const [selColor, setSelColor] = useState('#FFFFFF');
  const tabNameRef = useRef();

  useEffect(() => {
    if (!anchorEl || !accountId) {
      changeLoading(false);
      return;
    }

    changeLoading(true);
    accountService
      .getInfluencerTags(accountId)
      .then((response) => {
        changeLoading(false);
        if (response.status !== 'ok') {
          changeStatus({});
          setOrgTags([]);
          return;
        }

        setOrgTags(response.data.tags);

        let match;
        _.map(response.data.tags, (itm) => {
          match = _.find(
            response.data.selected,
            (selItm) => selItm === itm._id,
          );
          if (match) _.set(chkStatus, itm._id, true);
          else _.set(chkStatus, itm._id, false);
        });

        changeStatus({ ...chkStatus });
      })
      .catch((err) => {
        changeLoading(false);
        changeStatus({});
        setOrgTags([]);
      });
  }, [anchorEl, accountId]);

  const saveAccount = (tagId, checkStatus, tagName, tagColor, tmpStatus) => {
    accountService
      .updateInfluencerTags(accountId, tagId, checkStatus)
      .then((response) => {
        if (response.status !== 'ok') {
          toast.error(response.msg);
          return;
        }

        if (checkStatus)
          toast.success(
            locale == 'jp'
              ? `[${tagName}]を取り付けました。`
              : `Added [${tagName}]`,
          );
        else
          toast.success(
            locale == 'jp'
              ? `[${tagName}]を外しました。`
              : `Removed [${tagName}]`,
          );

        setTags(tagId, tagName, tagColor, checkStatus);
        changeStatus({ ...tmpStatus });
      })
      .catch((err) => {
        toast.error(err.toString());
      });
  };

  // const handleChange = (evt, tagName, tagColor) => {
  //   let tmpStatus = { ...chkStatus, [evt.target.name]: evt.target.checked };
  //   saveAccount(
  //     evt.target.name,
  //     evt.target.checked,
  //     tagName,
  //     tagColor,
  //     tmpStatus,
  //   );
  // };

  const handleClick = (tagId, selected, tagName, tagColor) => {
    let tmpStatus = { ...chkStatus, [tagId]: selected };
    saveAccount(tagId, selected, tagName, tagColor, tmpStatus);
  };

  const getTagName = (tagId) => {
    let tag = _.find(tags, (selItm) => selItm._id === tagId);
    if (!tag) return '';

    return tag.name;
  };

  const getTagColor = (tagId) => {
    let tag = _.find(tags, (selItm) => selItm._id === tagId);
    if (!tag) return '#FFFFFF';

    return tag.color;
  };

  const appendNewTag = async () => {
    if (tabNameRef.current.value.trim() === '') {
      toast.error(lang[locale].errorNoTagName);
      return;
    }

    if (selColor === '#FFFFFF') {
      toast.error(lang[locale].errorNoColorSelected);
      return;
    }

    let newId = await accountService
      .appendTag(tabNameRef.current.value, selColor, '')
      .then((response) => {
        if (response.status !== 'ok') {
          toast.error(response.msg);
          return -1;
        }

        if (response.data == -1) {
          toast.error(lang[locale].errorDuplicateTagName);
          return -1;
        }

        return response.data;
      })
      .catch((msg) => {
        toast.error(msg.toString());
        return -1;
      });

    if (newId === -1) return;

    changeStatus({ ...chkStatus, [newId]: false });
    setOrgTags([
      ...tags,
      { _id: newId, name: tabNameRef.current.value, color: selColor },
    ]);

    tabNameRef.current.value = '';
    setSelColor('#FFFFFF');

    toast.success(lang[locale].successAddTag);
  };

  const compareTagColors = (a, b) => {
    if (getTagColor(a[0]) < getTagColor(b[0])) {
      return -1;
    }
    if (getTagColor(a[0]) > getTagColor(b[0])) {
      return 1;
    }
    return 0;
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
      <section
        className="saveDlg saveDlg--tag"
        onClick={(e) => e.stopPropagation()}
      >
        <Box className="up-triangle"></Box>
        <Box className="saveDlgToolbar">
          <Typography variant="h6">{lang[locale].addTag}</Typography>
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
        {isLoading ? (
          <Skeleton width={'100%'} height={100} sx={{ transform: 'unset' }} />
        ) : (
          <ul className="tagcontents">
            {_.map(
              Object.entries(chkStatus).sort(compareTagColors),
              ([tagId, val]) => (
                <li key={tagId}>
                  <span
                    style={{
                      border: `1px solid ${getTagColor(tagId)}`,
                      color: val ? `white` : `${getTagColor(tagId)}`,
                      backgroundColor: !val ? `white` : `${getTagColor(tagId)}`,
                      padding: '.2rem',
                      lineHeight: '1',
                      borderRadius: '.2em',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                    onClick={(evt) => {
                      val = !val;
                      handleClick(
                        tagId,
                        val,
                        getTagName(tagId),
                        getTagColor(tagId),
                      );
                    }}
                  >
                    {getTagName(tagId)}
                  </span>
                  {/* <Checkbox
                  name={tagId}
                  checked={val}
                  onChange={(evt) =>
                    handleChange(evt, getTagName(tagId), getTagColor(tagId))
                  }
                  sx={{
                    color: '#A3DE97 !important',
                    '& .MuiSvgIcon-root': { fontSize: 24 },
                  }}
                /> */}
                </li>
              ),
            )}
          </ul>
        )}
        <Box
          sx={{
            padding: '.5rem',
            display: 'flex',
            columnGap: '.5rem',
            alignItems: 'center',
            borderTop: '2px solid #eee',
          }}
        >
          {isLoading ? (
            <Skeleton width={'100%'} height={50} sx={{ transform: 'unset' }} />
          ) : (
            <>
              <TextField
                size="small"
                placeholder={lang[locale].tagName}
                inputProps={{
                  style: {
                    fontSize: '14px',
                  },
                }}
                sx={{
                  flex: 1,
                }}
                inputRef={tabNameRef}
              />
              <Select
                value={selColor}
                onChange={(e) => setSelColor(e.target.value)}
                size="small"
                MenuProps={MenuProps}
                sx={{
                  width: '4rem',
                  fontSize: '14px',
                  '& > .MuiSelect-select': {
                    backgroundColor: `${selColor}`,
                  },
                  '& > svg': {
                    backgroundColor: 'inherit',
                  },
                }}
              >
                {_.map(TagColors, (itm, itmIdx) => (
                  <MenuItem
                    key={itmIdx}
                    value={itm}
                    sx={{
                      '&:hover': {
                        backgroundColor: `${itm} !important`,
                      },
                      '&.Mui-selected': {
                        backgroundColor: `${itm} !important`,
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: `${itm} !important`,
                      },
                      height: '30px',
                      width: '22px',
                      backgroundColor: `${itm} !important`,
                    }}
                  />
                ))}
              </Select>
              <Button
                sx={{ minWidth: 'fit-content !important', padding: 0 }}
                onClick={(e) => appendNewTag()}
              >
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
              </Button>
            </>
          )}
        </Box>
      </section>
    </Popover>
  );
}
