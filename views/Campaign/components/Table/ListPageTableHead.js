import React, { useRef } from 'react';
import readXlsxFile from 'read-excel-file';
import toast from 'react-hot-toast';
import Papa from 'papaparse';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getNamesFromFileData } from 'constants/constants';
import RoundInfo from '../../../../components/RoundInfo';
import { useRouter } from 'next/router';

ListTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  headCells: PropTypes.array.isRequired,
};

const lang = {
  en: {
    exceed: "You can't read more than 500 people at once. ",
    error: 'An error occurred while reading the XLSX file.',
    choose: 'Choose a CSV or XLSX file.',
    fileRead: 'File read',
    info: 'Up to 500 people can be registered at once.',
  },
  jp: {
    exceed: '500人以上を一度に読むことはできません。 ',
    error: 'XLSXファイルを読み込み中にエラーが発生しました。',
    choose: 'CSVとかXLSXファイルを選択してください。',
    fileRead: 'ファイル読み込み',
    info: '一回に登録できる人数は500人までです',
  },
};

export default function ListTableHead({
  order,
  orderBy,
  onRequestSort,
  headCells,
  reload,
  hideCSV = false,
}) {
  const { locale } = useRouter();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const fileinputRef = useRef();

  const parseFile = (file) => {
    Papa.parse(file, {
      header: false,
      complete: (results) => {
        loadInfluencers(results.data);
      },
    });
  };

  const loadInfluencers = (values) => {
    let result = getNamesFromFileData(values);
    if (!(result?.length > 0)) return;

    reload && reload(result);

    return;
  };

  const fileSelected = (e) => {
    const files = e.target.files;

    if (files?.length < 1) return;

    const extension = files[0].name.split('.').at(-1);
    if (extension === 'xlsx') {
      readXlsxFile(files[0])
        .then((rows) => {
          loadInfluencers(rows);
        })
        .catch((e) => {
          toast.error(lang[locale].error);
        });
    } else if (extension === 'csv') {
      parseFile(files[0]);
    } else {
      toast.error(lang[locale].choose);
    }
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            align={headCell.align}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id !== 'action' ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                sx={{ fontWeight: 'bold', whiteSpace: 'pre' }}
              >
                {headCell.id === 'star' ? (
                  <Box
                    component={LazyLoadImage}
                    effect="blur"
                    src={'/images/svgs/star.svg'}
                    width={'20px'}
                    height={'20px'}
                    marginTop={'5px'}
                  />
                ) : (
                  headCell.label[locale]
                )}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : hideCSV ? (
              <></>
            ) : (
              <Box style={{ display: 'flex' }}>
                <span
                  onClick={(e) => fileinputRef.current.click()}
                  style={{
                    cursor: 'pointer',
                    textAlign: 'right',
                    color: '#16acf3',
                  }}
                >
                  {lang[locale].fileRead}
                  <input
                    type="file"
                    accept=".csv,.xlsx"
                    hidden
                    ref={fileinputRef}
                    onChange={fileSelected}
                  />
                </span>
                <RoundInfo caption={lang[locale].info} marginLeft={1} />
              </Box>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
