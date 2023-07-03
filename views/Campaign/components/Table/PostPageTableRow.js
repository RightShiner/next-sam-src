import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  Rating,
  TableCell,
  TableRow,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useMainContext } from 'context/MainContext';
import StatusSelect from '../StatusSelect';
import { CP, SelectTagDlg } from 'views/Common';
import RelativeImage from 'components/RelativeImage';
import { getSortedTags } from 'constants/constants';
import { useRouter } from 'next/router';

const statusValues = {
  en: [
    'Stop',
    'Item shipped',
    'Waiting for draft',
    'Waiting for this post',
    'Waiting for insight',
    'End',
  ],
  jp: [
    '中止',
    '商品発送済み',
    '下書き待ち',
    '本投稿待ち',
    'インサイト待ち',
    '終了',
  ],
};

export default function PostPageTableRow({
  row,
  index,
  handleSaveAmount,
  handleSaveMember,
  orgTags,
}) {
  const { locale } = useRouter();
  const amountRef = useRef();

  const getCurrentTags = () => {
    let isExists = -1;
    let tmp = _.map(row.tags, (itm) => {
      isExists = _.findIndex(orgTags, (orgTag) => {
        return orgTag._id === itm;
      });

      if (isExists === -1) return { tagId: '' };

      return {
        tagId: itm,
        name: orgTags[isExists].name,
        color: orgTags[isExists].color,
      };
    });

    tmp = _.filter(tmp, (itm) => itm.tagId !== '');
    return tmp;
  };

  const [tags, setTags] = useState(getCurrentTags());

  useEffect(() => {
    setTags(getCurrentTags());
  }, [orgTags, row]);

  const formatterInt = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  });

  const [selAccountId, setAccountId] = useState('');

  const closeCP = (val) => {
    setData({ ...data, star: val.star });
    setTags([...val.tags]);
    setAccountId('');
  };

  const [data, setData] = useState(row);

  const {
    setInfluencerCollapsable,
    setSelectedInfluencer,
    selectedInfluencer,
  } = useMainContext();

  const handleSelectChanged = (index) => {
    setInfluencerCollapsable(false);
    setSelectedInfluencer({
      id: row.infId,
      username: row.infName,
      type: row.type,
      avgViews: row?.recycle ?? 0,
    });
  };

  const changeStatus = (val) => {
    handleSaveMember(row._id, val);
  };

  const blurAmount = () => {
    handleSaveAmount(index, amountRef.current.value);
  };

  const [anchorTag, setAnchorTag] = useState(null);
  const closeTagDlg = () => {
    setAnchorTag(null);
  };

  const updateTags = (_id, name, color, isChecked) => {
    if (isChecked) {
      setTags([...tags, { tagId: _id, name, color }]);
    } else {
      setTags(_.filter(tags, (tag) => tag.tagId !== _id));
    }
  };

  return (
    <>
      <TableRow
        className={`${
          selectedInfluencer === index ? 'influencer-detail-active' : ''
        }`}
        hover
        onClick={() => handleSelectChanged(index)}
        tabIndex={-1}
      >
        <TableCell align="center">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <RelativeImage
              isRound
              imgSrc={row.avatar}
              sx={{
                width: '3.125rem !important',
                height: '3.125rem !important',
                margin: '.5rem',
              }}
            />
            <Rating value={row.star} readOnly />
          </Box>
        </TableCell>
        <TableCell align="left" sx={{ width: '150px !important' }}>
          {row.name}
        </TableCell>
        <TableCell align="left" sx={{ width: '200px !important' }}>
          {_.map(getSortedTags(tags), (itm, idx) => (
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
                    border: `1px solid ${curMem.color}`,
                    color: `${curMem.color}`,
                    padding: '.2rem',
                    borderRadius: '.2rem',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  {curMem.name}
                </span>
              ))}
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={(e) => {
              e.stopPropagation();
              setAnchorTag(e.currentTarget);
            }}
            sx={{
              border: '1px solid #1377EB',
              padding: 0,
            }}
          >
            追加
          </Button>
        </TableCell>
        <TableCell align="left">{formatterInt.format(row.followers)}</TableCell>
        <TableCell align="left">{formatterInt.format(row.engage)}</TableCell>
        <TableCell align="center">
          <TextField
            defaultValue={row.amount}
            variant="outlined"
            size="small"
            placeholder="金額"
            sx={{ width: '140px', fontSize: '14px', padding: '8px' }}
            type="number"
            InputProps={{
              classes: { input: 'customPlaceholder' },
              style: { color: '#000' },
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onBlur={(e) => blurAmount()}
            inputRef={amountRef}
          />
        </TableCell>
        <TableCell align="center">
          <StatusSelect
            initValue={row.status}
            values={statusValues[locale]}
            step={2}
            row={row}
            updateStatus={changeStatus}
            style={{ width: '150px', marginLeft: 'auto' }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </TableCell>
        <TableCell align="center">
          <Box className="relative-action">
            <Button
              variant={'outlined'}
              style={{ padding: '0 20px' }}
              onClick={(e) => {
                e.stopPropagation(), setAccountId(row.accountId);
              }}
            >
              DB
            </Button>
          </Box>
        </TableCell>
      </TableRow>
      <SelectTagDlg
        anchorEl={anchorTag}
        closeDlg={closeTagDlg}
        accountId={row.accountId}
        setTags={updateTags}
      />
      <CP accountId={selAccountId} stars={data.star} setCollapse={closeCP} />
    </>
  );
}
