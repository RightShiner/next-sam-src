import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Rating, TableCell, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StatusSelect from '../StatusSelect';
import { useMainContext } from 'context/MainContext';
import RelativeImage from 'components/RelativeImage';
import { SaveDlg, CP, SelectTagDlg } from 'views/Common';
import Lang from 'constants/lang';
import { getSortedTags } from 'constants/constants';
import { useRouter } from 'next/router';

export default function ListPageTableRow({
  row,
  index,
  catType,
  handleSaveMember,
  orgTags,
}) {
  const { locale } = useRouter();
  const statusValues = {
    en: ['Checking in-house', 'During negotiations', 'NG', 'OK'],
    jp: ['社内確認中', '交渉中', 'NG', 'OK'],
  };
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });

  const formatterInt = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const closeDlg = () => {
    setAnchorEl(null);
  };

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
  const handleSelectChanged = (e) => {
    setInfluencerCollapsable(false);
    setSelectedInfluencer({
      id: row.infId,
      username: row.infName,
      type: row.type,
      avgViews: row?.recycle ?? 0,
    });
  };

  const changeStatus = (val) => {
    handleSaveMember(index, val);
  };

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

  useEffect(() => {
    setTags(getCurrentTags());
    setData(row);
  }, [row]);

  return (
    <>
      <TableRow
        className={`${
          selectedInfluencer && selectedInfluencer.id === row.infId
            ? 'influencer-detail-active'
            : ''
        }`}
        hover
        onClick={handleSelectChanged}
        tabIndex={-1}
        key={index}
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
            <Rating value={data.star} readOnly />
          </Box>
        </TableCell>
        <TableCell align="left" sx={{ width: '150px !important' }}>
          {row.detail_doc.profile.fullname}
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
        <TableCell align="left">
          {formatterInt.format(row.detail_doc.profile.followers)}
        </TableCell>
        <TableCell align="left">
          {formatter.format(row.detail_doc.profile.engagementRate * 100)} %
        </TableCell>
        <TableCell align="center">
          <StatusSelect
            initValue={row.status}
            values={statusValues[locale]}
            step={1}
            row={row}
            updateStatus={changeStatus}
            style={{ width: '130px', marginLeft: 'auto' }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </TableCell>
        <TableCell align="center">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              width: '170px',
            }}
          >
            <Button
              variant={'outlined'}
              style={{ padding: '0 20px' }}
              onClick={(e) => {
                e.stopPropagation(), setAccountId(row.accountId);
              }}
            >
              DB
            </Button>
            <Box className="relative-action">
              <Button
                variant={'outlined'}
                style={{ padding: '0 20px' }}
                onClick={(e) => {
                  e.stopPropagation(), setAnchorEl(e.currentTarget);
                }}
              >
                {Lang[locale].btn.register}
              </Button>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
      <SaveDlg
        anchorEl={anchorEl}
        closeDlg={closeDlg}
        infId={row.infId}
        catType={catType}
      />
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
