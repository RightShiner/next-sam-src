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
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { Typography } from '@mui/material';
import RoundInfo from 'components/RoundInfo';

export default function StepPageTableHead({
  order,
  orderBy,
  method,
  headCells,
  selected,
  rowCount,
  onRequestSort,
  onSelectAllClick,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {method === 'auto' && (
            <Checkbox
              color="primary"
              indeterminate={selected.length > 0 && selected.length < rowCount}
              checked={rowCount > 0 && selected.length === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          )}
        </Box>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              fontWeight: 'bold',
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {headCell.caption && (
                <RoundInfo
                  caption={headCell.caption}
                  sx={{
                    ml: '.5em',
                    pb: '.2em',
                  }}
                />
              )}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

StepPageTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  headCells: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
};
