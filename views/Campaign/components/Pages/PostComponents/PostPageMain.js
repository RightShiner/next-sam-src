import React, { useState, useMemo, useCallback, createContext } from 'react';
import { Box, Button, Typography } from '@mui/material';

import { GridView, TableView } from './PostMainComponents';
import {
  PostDetailAction,
  PostDetailDialog,
  PostDeleteDialog,
  PostEditDialog,
} from './PostDialog';
import { getComparator, stableSort } from 'libs/commonFunc';

export const modalContext = createContext(null);

const PostPageMain = ({
  data,
  catType,
  orderBy,
  viewMode,
  selCampId,
  setReload,
  report,
}) => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [detailInfo, setDetailInfo] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  let sortedData = stableSort(data, getComparator('desc', orderBy)) ?? [];
  let index = sortedData.indexOf(detailInfo);

  const findDetailInfo = (id) => {
    let detailInfo = data.find((item) => {
      return item.pk === id;
    });
    setDetailInfo(detailInfo);
  };

  const handleDetailModalOpen = (selectedId) => {
    setOpen(true);
    findDetailInfo(selectedId);
  };

  const handleNext = () => {
    if (index >= 0 && index < sortedData.length - 1) {
      let nextItem = sortedData[index + 1];
      setDetailInfo(nextItem);
    }
  };

  const handlePrev = () => {
    if (index > 0 && index <= sortedData.length - 1) {
      let prevItem = sortedData[index - 1];
      setDetailInfo(prevItem);
    }
  };

  const handleMenuOpen = useCallback(
    (selectedId) => (e) => {
      setAnchorEl(e.currentTarget);
      findDetailInfo(selectedId);
    },
    [anchorEl],
  );

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  const handleDeleteClose = useCallback(() => {
    setDeleteOpen(false);
    setReload((prev) => !prev);
  }, [deleteOpen]);

  const handleEditClose = useCallback(() => {
    setEditOpen(false);
    setReload((prev) => !prev);
  }, [editOpen]);

  const modalContextValue = useMemo(
    () => ({
      handleMenuOpen,
    }),
    [],
  );

  const memoGridView = useMemo(
    () => (
      <GridView
        data={sortedData}
        handleOpen={handleDetailModalOpen}
        report={report}
      />
    ),
    [sortedData],
  );

  return (
    <modalContext.Provider value={modalContextValue}>
      <Box className="post_main">
        {viewMode === 'grid' ? (
          memoGridView
        ) : (
          <TableView data={sortedData} handleOpen={handleDetailModalOpen} />
        )}
        <PostDetailDialog
          open={open}
          data={detailInfo}
          handleNext={handleNext}
          handlePrev={handlePrev}
          onClose={() => setOpen(false)}
        />
        <PostDetailAction
          anchorEl={anchorEl}
          menuOpen={menuOpen}
          setEditOpen={setEditOpen}
          setDeleteOpen={setDeleteOpen}
          handleMenuClose={handleMenuClose}
        />
        <PostDeleteDialog
          open={deleteOpen}
          selCampId={selCampId}
          detailInfo={detailInfo}
          handleClose={handleDeleteClose}
        />
        <PostEditDialog
          open={editOpen}
          catType={catType}
          selCampId={selCampId}
          detailInfo={detailInfo}
          handleClose={handleEditClose}
          setReload={setReload}
        />
      </Box>
    </modalContext.Provider>
  );
};

export default PostPageMain;
