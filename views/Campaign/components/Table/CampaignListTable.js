import _ from 'lodash';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/CheckCircleOutline';
import RenewIcon from '@mui/icons-material/Autorenew';
import RemoveAlertDlg from './RemoveAlertDlg';
import CustomTableHead from './CustomTableHead';
import { getComparator, stableSort } from 'libs/commonFunc';
import Constants from 'constants/constants';
import { campaignService } from 'services';
import toast from 'react-hot-toast';
import keywords from 'constants/lang';
import { useRouter } from 'next/router';

const lang = {
  jp: {
    successRemoveCampaign: 'キャンペーンを削除しました。',
    failRemoveCampaign: 'キャンペーン削除に失敗しました。',
    successToggleCampaignVisibility: 'キャンペーン表示を変更しました。',
    failToggleCampaignVisibility: 'キャンペーン表示変更に失敗しました。',
    showCampaign: '表示する',
    hideCampaign: '非表示にする',
    delete: '削除',
    noSuchCampaign: '検索結果がありません',
    warningTitle: 'キャンペーンリスト削除',
    warningMessage:
      'キャンペーンリストのデータが全て削除されます。本当によろしいですか。',
  },
  en: {
    successRemoveCampaign: 'Successfully removed campaign.',
    failRemoveCampaign: 'Unexpected error during campaign deletion',
    successToggleCampaignVisibility: 'Successfully changed campaign visibility',
    failToggleCampaignVisibility:
      'Unexpected error changing campaign visibility',
    showCampaign: 'Show',
    hideCampaign: 'Hide',
    delete: 'Delete',
    noSuchCampaign: 'No campaign',
    warningTitle: 'Delete campaign',
    warningMessage: 'Are you sure to delete all data of the campaign?',
  },
};

const headCells = [
  {
    id: 'name',
    numeric: false,
    label: { en: 'Campaign', jp: 'キャンペーン' },
  },
  {
    id: 'genre',
    numeric: false,
    label: { en: 'Genre', jp: 'ジャンル' },
  },
  {
    id: 'sns',
    numeric: false,
    label: { en: 'SNS', jp: 'SNS' },
  },
  {
    id: 'list',
    numeric: false,
    label: { en: 'List', jp: 'リスト' },
  },
  {
    id: 'amount',
    numeric: true,
    label: { en: 'Amount of money', jp: '金額' },
  },
  {
    id: 'mems',
    numeric: true,
    label: { en: '# of people', jp: 'リスト人数' },
  },
  {
    id: 'cdate',
    numeric: true,
    label: { en: 'Created', jp: '作成日' },
  },
  {
    id: 'edate',
    numeric: true,
    label: { en: 'End date', jp: '終了日' },
  },
  {
    id: 'rich',
    numeric: true,
    label: { en: 'Reach', jp: 'リーチ数' },
  },
  {
    id: 'richper',
    numeric: true,
    label: { en: 'Reach%', jp: 'リーチ%' },
  },
  {
    id: 'sell',
    numeric: true,
    label: { en: 'Earnings', jp: '売上' },
  },
  {
    id: 'roas',
    numeric: true,
    label: { en: 'ROAS', jp: 'ROAS' },
  },
  {
    id: 'temp',
    numeric: true,
    label: { en: '', jp: '' },
  },
];

const initAlertInfo = { show: false, selRow: null };

export default function CampaignListTable({
  data,
  handleSelectChanged,
  list,
  sns,
  genre,
  userInfo,
}) {
  const { locale } = useRouter();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('cdate');
  const [selected, setSelected] = useState('');
  const [rows, setRows] = useState(data);

  const [alertInfo, setAlertInfo] = useState(initAlertInfo);
  const closeAlertDlg = async (val) => {
    if (val === true) {
      // okの場合
      const retVal = await campaignService
        .switchFlag(alertInfo.selRow.id, true, 'delete')
        .then((ret) => ret.status)
        .catch((error) => {
          return false;
        });

      if (retVal === true) {
        const results = rows.filter((row) => row.id !== alertInfo.selRow.id);
        setRows([...results]);

        toast.success(lang[locale].successRemoveCampaign);
      } else {
        toast.error(lang[locale].failRemoveCampaign);
      }
    }

    setAlertInfo({ ...initAlertInfo });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (rowId) => {
    setSelected(rowId);
    handleSelectChanged(rowId);
  };

  const handleClickDelete = (row) => {
    setAlertInfo({ show: true, selRow: row });
  };

  const handleClickVisible = async (campId, value) => {
    const retVal = await campaignService
      .switchFlag(campId, value, 'visible')
      .then((ret) => ret.status)
      .catch((error) => {
        return false;
      });

    if (retVal === false) {
      toast.error(lang[locale].failToggleCampaignVisibility);
      return;
    }

    toast.success(lang[locale].successToggleCampaignVisibility);

    const results = rows.map((row) => {
      if (row.id !== campId) return row;

      return { ...row, visible: value };
    });

    setRows([...results]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* '0 0px 6px 0 rgb(140 152 164 / 53%)' */}
      <Paper
        sx={{
          width: '100%',
          mt: 2,
          mb: 2,
          overflow: 'auto',
          boxShadow: 'none !important',
        }}
      >
        <TableContainer style={{ padding: 10 }}>
          <Table
            className="styledTable"
            sx={{ minWidth: 1350 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <CustomTableHead
              headCells={
                userInfo?.id !== '620f41d5fc9e8deb0c16573e'
                  ? headCells.filter((cells) => cells.id != 'list')
                  : headCells
              }
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.length > 0 ? (
                stableSort(rows, getComparator(order, orderBy))
                  .filter(
                    (row) =>
                      userInfo?.id !== '620f41d5fc9e8deb0c16573e' ||
                      list == keywords[locale].label.all ||
                      row.list == list,
                  )
                  .filter(
                    (row) =>
                      sns == keywords[locale].label.all ||
                      row.sns == sns.toLowerCase(),
                  )
                  .filter(
                    (row) =>
                      genre == keywords[locale].label.all || row.genre == genre,
                  )
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        onClick={() => handleClick(row.id)}
                        tabIndex={-1}
                        key={index}
                        selected={selected === row.id}
                      >
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.genre}</TableCell>
                        <TableCell>
                          {_.get(Constants.snsTypes, row.sns)}
                        </TableCell>
                        {userInfo?.id == '620f41d5fc9e8deb0c16573e' && (
                          <TableCell>{row.list}</TableCell>
                        )}
                        <TableCell>{row.amount ?? row.amount}</TableCell>
                        <TableCell>{row.mems ?? row.mems}</TableCell>
                        <TableCell>{row.cdate ?? row.cdate}</TableCell>
                        <TableCell>{row.edate ?? row.edate}</TableCell>
                        <TableCell>{row.rich ?? row.rich}</TableCell>
                        <TableCell>{row.richper ?? row.richper}</TableCell>
                        <TableCell>{row.sell ?? row.sell}</TableCell>
                        <TableCell>{row.roas ?? row.roas}</TableCell>
                        <TableCell>
                          <Button
                            className={`${!row.visible ? 'seconday' : ''}`}
                            startIcon={
                              row.visible ? <BlockIcon /> : <CheckIcon />
                            }
                            variant="outlined"
                            size="small"
                            sx={{ width: '126px' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClickVisible(row.id, !row.visible);
                            }}
                          >
                            {!row.visible
                              ? lang[locale].showCampaign
                              : lang[locale].hideCampaign}
                          </Button>
                          <Button
                            className="error"
                            startIcon={<DeleteIcon />}
                            variant="outlined"
                            size="small"
                            sx={{ marginLeft: '.5rem' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClickDelete(row);
                            }}
                          >
                            {lang[locale].delete}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={12}>
                    {lang[locale].noSuchCampaign}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <RemoveAlertDlg
          dlgState={alertInfo.show}
          closeDlg={closeAlertDlg}
          title={lang[locale].warningTitle}
          caption={lang[locale].warningMessage}
        />
      </Paper>
    </Box>
  );
}
