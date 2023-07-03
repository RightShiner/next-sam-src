/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Popover, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
    },
  },
};

const lang = {
  en: {
    title: 'Register tags',
  },
  jp: {
    title: 'タグを登録するタグを登録する',
  },
};

export default function SearchTagDlg({
  anchorEl,
  closeDlg,
  setTags,
  tags,
  itemValue,
}) {
  const { locale } = useRouter();
  const [chkStatus, changeStatus] = useState({});

  useEffect(() => {
    let match;
    _.map(tags, (itm) => {
      match = _.find(itemValue, (selItm) => selItm === itm._id);
      chkStatus[itm._id] = !!match;
    });

    changeStatus({ ...chkStatus });
  }, [anchorEl]);

  const handleClick = (tagId, selected) => {
    let tmpStatus = { ...chkStatus, [tagId]: selected };
    changeStatus(tmpStatus);
    let value = _.filter(Object.entries(tmpStatus), (el) => {
      return el[1] === true;
    });
    value = _.map(value, (itm) => {
      return itm[0];
    });
    setTags(value);
  };

  const getTagName = (tagId) => {
    let tag = tags.find((selItm) => selItm._id === tagId);

    return tag?.name ?? '';
  };

  const getTagColor = (tagId) => {
    let tag = tags.find((selItm) => selItm._id === tagId);

    return tag?.color ?? '#FFFFFF';
  };

  const compareTagColors = (a, b) => {
    return getTagColor(a[0]) - getTagColor(b[0]);
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
          <Typography variant="h6">{lang[locale].title}</Typography>
          <Box className="saveDlgButtons">
            <CloseIcon
              fontSize="medium"
              className="closeIcon"
              onClick={(e) => closeDlg()}
            />
          </Box>
        </Box>
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
                    handleClick(tagId, val);
                  }}
                >
                  {getTagName(tagId)}
                </span>
              </li>
            ),
          )}
        </ul>
      </section>
    </Popover>
  );
}
