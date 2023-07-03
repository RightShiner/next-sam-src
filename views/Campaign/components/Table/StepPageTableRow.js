import React from 'react';
import {
  Box,
  TableCell,
  TableRow,
  Checkbox,
  Radio,
  Avatar,
  Typography,
} from '@mui/material';
import { evaluateValue } from 'constants/constants';

export default function StepPageTableRow({
  row,
  index,
  method,
  selected,
  setSelected,
}) {
  const handleAutoClick = (val) => () => {
    const selectedIndex = selected.map((e) => e.infId).indexOf(val.infId);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, val);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleManualClick = (val) => () => {
    setSelected([val]);
  };

  const isSelected = (id) => {
    let checked = selected.some((e) => e.infId === id);
    return checked;
  };

  const isItemSelected = isSelected(row.infId);
  const labelId = `enhanced-table-checkbox-${index}`;

  const formatterInt = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  });

  return (
    <TableRow
      hover
      onClick={
        method === 'auto' ? handleAutoClick(row) : handleManualClick(row)
      }
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.name}
      selected={isItemSelected}
      sx={{ height: '85px' }}
    >
      <TableCell padding="checkbox">
        {method === 'auto' ? (
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
          />
        ) : (
          <Radio
            color="primary"
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
          />
        )}
      </TableCell>
      <TableCell align="center">
        <Box className="account_table_box">
          <Avatar
            alt="account"
            src={row.avatar}
            aria-label="recipe"
            sx={{ width: '52px', height: '52px' }}
          />
          <Box>
            <Typography>{row.name}</Typography>
            <Typography>{'@' + row.infName}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="left" sx={{ width: '150px !important' }}>
        {evaluateValue(row.followers)}
      </TableCell>
      <TableCell>{((row?.engagerate ?? 0) * 100).toFixed(2)}</TableCell>
      <TableCell>---</TableCell>
    </TableRow>
  );
}
