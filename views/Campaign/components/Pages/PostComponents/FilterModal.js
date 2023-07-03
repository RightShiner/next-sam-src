import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import {
  AccountFilter,
  PeriodFilter,
  TypeFilter,
  PropertyFilter,
} from './FilterModalComponents';

const FilterModal = ({
  open,
  filter,
  setFilter,
  catType,
  campaignMembers,
  handleSearch,
  handleClose,
}) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      className="post-dialog filter-dialog"
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        フィルター
        <Box aria-label="close" className="cross_symbol" onClick={handleClose}>
          <span>&#10006;</span>
        </Box>
      </DialogTitle>
      <DialogContent className="content" dividers>
        <Stack spacing={5} divider={<Divider flexItem />}>
          <AccountFilter
            filter={filter}
            setFilter={setFilter}
            members={campaignMembers}
          />
          <PeriodFilter filter={filter} setFilter={setFilter} />
          <TypeFilter catType={catType} filter={filter} setFilter={setFilter} />
          <PropertyFilter filter={filter} setFilter={setFilter} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleSearch}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterModal;
