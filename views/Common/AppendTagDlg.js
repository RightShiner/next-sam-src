import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { accountService } from 'services';
import toast from 'react-hot-toast';
import { TagColors } from 'constants/constants';
import AlertDlg from './AlertDlg';
import { useRouter } from 'next/router';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
    },
  },
};

const initAlertStatus = {
  type: 0,
  status: false,
  title: '',
  caption: '',
  okcap: '',
  cancelcap: '',
};

const lang = {
  en: {
    title: 'Tag management',
    name: 'Tag name',
    color: 'Tag color',
    placeholder: 'Tag name to add',
    removeTag: 'Tag removed',
    deselection: 'Deselection',
    addNew: 'Add new',
    editReflection: 'Edit reflection',
    fixTag: 'Tag fixed',
    addTag: 'Tag added',
    selectTag: 'Please select the tag you want to delete.',
    delete: 'Delete',
    deleteCaption:
      'Deleting this tag will remove this tag from all influencers, is that correct?',
    deleteConfirm: 'Yes',
    deleteCancel: 'No',
    updateCaption:
      'Changing the tag will change the tag for all influencers that currently have this tag added, is that correct?',
    updateConfirm: 'Yes',
    updateCancel: 'No',
    noTag: 'No tags have been entered.',
    colorTag: 'Please specify color.',
    sameTag: 'You cannot add tags with the same name.',
  },
  jp: {
    title: 'タグ管理',
    name: 'タグ名称',
    color: 'タグ色',
    placeholder: '追加するタグ名称',
    removeTag: 'タグを削除しました。',
    deselection: '選択解除',
    addNew: '新規追加',
    editReflection: '編集反映',
    fixTag: 'タグを修正しました。',
    addTag: 'タグを追加しました。',
    selectTag: '削除したいタグを選択してください。',
    delete: '削除',
    deleteCaption:
      'このタグを削除すると、\n全てのインフルエンサーからこのタグが\n削除されますがよろしいでしょうか?',
    deleteConfirm: 'はい、削除します',
    deleteCancel: 'いいえ、戻ります',
    updateCaption:
      'タグを変更すると、現在このタグが追加されている\n全てのインフルエンサーのタグが\n変更されますがよろしいでしょうか?',
    updateConfirm: 'はい、変更します',
    updateCancel: 'いいえ、戻ります',
    noTag: 'タグが入力されていません。',
    colorTag: 'カラーを指定してください。',
    sameTag: '同じ名前のタグは追加できません。',
  },
};

export default function AppendTagDlg({ dlgState, closeDlg }) {
  const { locale } = useRouter();
  const [alertDlgStatus, setAlertDlgStatus] = useState({ ...initAlertStatus });
  const [curTags, setCurrentTags] = useState([]);
  const [selTag, selectTag] = useState(null);
  const [selColor, setSelColor] = useState('#FFFFFF');
  const tabNameRef = useRef();

  const initComponent = () => {
    selectTag(null);
    setSelColor('#FFFFFF');
    tabNameRef.current.value = '';
  };

  const closeAlertDlg = async (retVal) => {
    if (retVal === false) {
      setAlertDlgStatus({ ...initAlertStatus });
      return;
    }

    if (alertDlgStatus.type === 2) {
      let result = await accountService
        .removeTag(selTag._id)
        .then((response) => {
          if (response.status !== 'ok') {
            toast.error(response.msg);
            return false;
          }

          toast.success(lang[locale].removeTag);
          return true;
        })
        .catch((msg) => {
          toast.error(msg.toString());
          return false;
        });

      if (result === true)
        setCurrentTags([..._.filter(curTags, (itm) => itm._id !== selTag._id)]);
    } else {
      let newId = await accountService
        .appendTag(tabNameRef.current.value, selColor, selTag._id)
        .then((response) => {
          if (response.status !== 'ok') {
            toast.error(response.msg);
            return -1;
          }

          toast.success(lang[locale].fixTag);
          return response.data;
        })
        .catch((msg) => {
          toast.error(msg.toString());
          return -1;
        });

      if (newId !== -1)
        setCurrentTags([
          ..._.map(curTags, (itm) => {
            if (itm._id === selTag._id)
              return {
                _id: selTag._id,
                name: tabNameRef.current.value,
                color: selColor,
              };
            return itm;
          }),
        ]);
    }

    initComponent();
    setAlertDlgStatus({ ...initAlertStatus });
  };

  const getSortedTags = () => {
    let sortedTags = Array.from(new Set(curTags.map((x) => x.color))).map(
      (color) => {
        const temp = curTags.filter((s) => s.color === color);
        return { color: color, members: temp };
      },
    );

    return sortedTags;
  };

  useEffect(() => {
    if (!dlgState) return;

    const getTagList = async () => {
      await accountService
        .getTagList()
        .then((response) => {
          if (response.status !== 'ok') return;

          setCurrentTags(response.data);
        })
        .catch((msg) => {});
    };

    selectTag(null);
    setSelColor('#FFFFFF');
    getTagList();
  }, [dlgState]);

  const removeTagHandler = () => {
    if (selTag === null) {
      toast.error(lang[locale].selectTag);
      return;
    }

    setAlertDlgStatus({
      type: 2, // remove
      status: true,
      title: lang[locale].delete,
      caption: lang[locale].deleteCaption,
      okcap: lang[locale].deleteConfirm,
      cancelcap: lang[locale].deleteCancel,
    });
  };

  const appendTagHandler = async (isAppend) => {
    if (tabNameRef.current.value.trim() === '') {
      toast.error(lang[locale].noTag);
      return;
    }

    if (selColor === '#FFFFFF') {
      toast.error(lang[locale].colorTag);
      return;
    }

    if (!isAppend) {
      setAlertDlgStatus({
        type: 1, // edit
        status: true,
        title: lang[locale].delete,
        caption: lang[locale].deleteCaption,
        okcap: lang[locale].deleteConfirm,
        cancelcap: lang[locale].deleteCancel,
      });

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
          toast.error('lang[locale].sameTag');
          return -1;
        }

        return response.data;
      })
      .catch((msg) => {
        toast.error(msg.toString());
        return -1;
      });

    if (newId === -1) return;

    setCurrentTags([
      ...curTags,
      { _id: newId, name: tabNameRef.current.value, color: selColor },
    ]);

    initComponent();
    toast.success(lang[locale].addTag);
  };

  return (
    <>
      <Dialog
        className="append-tag-dlg"
        open={dlgState}
        onClose={(e) => closeDlg(false)}
        aria-labelledby="append-tag-title"
        aria-describedby="append-tag-description"
      >
        <DialogTitle id="append-tag-title">{lang[locale].title}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="append-tag-description"
            sx={{ width: '450px', marginBottom: '.5rem' }}
          >
            {_.map(getSortedTags(), (itm, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '.5rem',
                  rowGap: '.5rem',
                  flexWrap: 'wrap',
                  marginBottom: '.5rem',
                }}
              >
                {_.map(itm.members, (curMem) => (
                  <span
                    key={curMem._id}
                    style={{
                      border: `${
                        selTag?._id === curMem._id ? '3px dotted' : '1px solid'
                      } ${curMem.color}`,
                      color: `${curMem.color}`,
                      padding: '.2rem',
                      borderRadius: '.2rem',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                    onClick={(e) => {
                      tabNameRef.current.value = curMem.name;
                      setSelColor(curMem.color);
                      selectTag(curMem);
                    }}
                  >
                    {curMem.name}
                  </span>
                ))}
              </Box>
            ))}
          </DialogContentText>
          <Box sx={{ width: '100%', height: 0, border: '1px solid #eee' }} />
          <Box
            sx={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}
          >
            <span style={{ marginRight: '.5rem' }}>{lang[locale].name}</span>
            <TextField
              size="small"
              placeholder={lang[locale].placeholder}
              inputProps={{
                style: {
                  fontSize: '14px',
                },
              }}
              inputRef={tabNameRef}
            />
            <span style={{ marginLeft: '1rem', marginRight: '.5rem' }}>
              {lang[locale].color}
            </span>
            <Select
              value={selColor}
              onChange={(e) => setSelColor(e.target.value)}
              size="small"
              MenuProps={MenuProps}
              sx={{
                width: '72px',
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
                    width: '72px',
                    backgroundColor: `${itm} !important`,
                  }}
                />
              ))}
            </Select>
          </Box>
        </DialogContent>
        <DialogActions>
          {selTag !== null && (
            <Button
              onClick={(e) => {
                selectTag(null);
                tabNameRef.current.value = '';
                setSelColor('#FFFFFF');
              }}
            >
              {lang[locale].deselection}
            </Button>
          )}
          <Button onClick={(e) => removeTagHandler()}>
            {lang[locale].delete}
          </Button>
          <Button onClick={(e) => appendTagHandler(selTag === null)} autoFocus>
            {selTag === null
              ? lang[locale].addNew
              : lang[locale].editReflection}
          </Button>
        </DialogActions>
      </Dialog>
      <AlertDlg
        title={alertDlgStatus.title}
        caption={alertDlgStatus.caption}
        okcaption={alertDlgStatus.okcap}
        cancelcaption={alertDlgStatus.cancelcap}
        dlgState={alertDlgStatus.status}
        closeDlg={closeAlertDlg}
      />
    </>
  );
}
