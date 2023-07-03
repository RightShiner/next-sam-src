/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { accountService } from 'services';
import AppendTagDlg from '../AppendTagDlg';
import { useRouter } from 'next/router';
import { SearchTagDlg } from '..';
import toast from 'react-hot-toast';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
    },
  },
};

const lang = {
  en: { tag: 'Tag', management: 'Management' },
  jp: { tag: 'タグ', management: '管理' },
};

export default function FltInfluencerTag({ clearFlag, setValues, ...rest }) {
  const { locale } = useRouter();
  const [anchorTag, setAnchorTag] = useState(null);
  const [openDlg, setOpen] = useState(false);
  const [tags, setOrgTags] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    const getTagList = async () => {
      await accountService
        .getTagList()
        .then((response) => {
          if (response.status !== 'ok') return;

          setOrgTags(response.data);
        })
        .catch((msg) => {
          toast.error(msg.toString());
        });
    };

    getTagList();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const [itemValue, setItemValue] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (clearFlag === true || clearFlag === false) setTags([]);
  }, [clearFlag]);

  const setTags = (value) => {
    const newItemValue = typeof value === 'string' ? value.split(',') : value;
    setItemValue([...newItemValue]);
    setValues('tags', [...newItemValue]);
  };

  const closeDlg = () => {
    setOpen(false);
  };

  const closeTagDlg = () => {
    setAnchorTag(null);
  };

  return (
    <Box className="flex-sub-wrapper">
      <Box className="search-item-wrapper">
        <Box className="search-item-header">
          <span>{lang[locale].tag}</span>
        </Box>
        <span className="clear" onClick={(e) => setOpen(true)}>
          {lang[locale].management}
        </span>
      </Box>
      <Select
        multiple
        open={false}
        value={itemValue}
        onClick={(e) => setAnchorTag(e.currentTarget)}
        size="small"
        native={false}
        sx={{
          fontSize: '14px',
          '& > .MuiSelect-select': {
            backgroundColor: `${
              itemValue.length > 0
                ? theme.palette.clrVariables.cyanVeryLight
                : theme.palette.clrVariables.grayWhite
            }`,
          },
          '& > svg': {
            backgroundColor: 'inherit',
          },
          '& fieldset': {
            borderColor: `${
              itemValue.length > 0
                ? theme.palette.clrVariables.cyanLight
                : 'rgba(0,0,0,0.23)'
            }`,
          },
        }}
        {...rest}
      >
        {_.map(tags, (itm) => (
          <MenuItem
            key={itm._id}
            value={itm._id}
            sx={{
              fontSize: '14px',
              '&:hover': {
                background: `${itm.color}`,
                opacity: 0.7,
              },
              background: `${itm.color}`,
            }}
          >
            {itm.name}
          </MenuItem>
        ))}
      </Select>
      <AppendTagDlg dlgState={openDlg} closeDlg={closeDlg} tags={tags} />
      <SearchTagDlg
        anchorEl={anchorTag}
        closeDlg={closeTagDlg}
        tags={tags}
        setTags={setTags}
        itemValue={itemValue}
      />
    </Box>
  );
}
