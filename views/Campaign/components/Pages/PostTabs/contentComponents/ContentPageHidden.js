/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/styles';
import { monitoringService } from '../../../../../../services';

const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.monitoring.cencel,
  borderColor: theme.palette.monitoring.cencel,
  transition: 'all .2s ease-out',
  '&:hover': {
    backgroundColor: theme.palette.monitoring.cencel,
    opacity: 0.8,
  },
}));

const HiddenButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  backgroundColor: theme.palette.monitoring.hidden,
  borderColor: theme.palette.monitoring.hidden,
  transition: 'all .2s ease-out',
  '&:hover': {
    backgroundColor: theme.palette.monitoring.hidden,
    opacity: 0.8,
  },
}));

export default function ContentPageHidden({
  selCampId,
  hiddenMode,
  setHiddenMode,
  hiddenList,
  setHiddenList,
  fetchData,
}) {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleCancelClick = () => {
    setHiddenMode(false);
    setHiddenList([]);
  };

  const handleHiddenClick = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDialogHidden = async () => {
    await monitoringService.postHiddenList(selCampId, hiddenList);
    await fetchData();
    setOpen(false);
    setHiddenMode(false);
    setHiddenList([]);
  };

  if (!hiddenMode) {
    return null;
  }

  return (
    <>
      <Box
        marginTop={4}
        sx={{
          color: theme.palette.monitoring.hidden,
        }}
      >
        非表示にしたい投稿を選択してください
      </Box>
      <Box
        marginTop={2}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2em',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Button
            className={'inactive'}
            variant={'outlined'}
            size="medium"
            onClick={handleCancelClick}
            sx={{ minWidth: '90px' }}
          >
            戻る
          </Button>
          <Button
            className={'relative-action-danger'}
            variant={'outlined'}
            size="medium"
            onClick={handleHiddenClick}
          >
            非表示にする
          </Button>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          sx={{
            paddingTop: 8,
            paddingLeft: 8,
            paddingRight: 8,
            paddingBottom: 8,
          }}
        >
          {hiddenList.length === 0 ? (
            <>
              <Box
                sx={{
                  color: theme.palette.monitoring.hidden,
                  fontSize: '1.2rem',
                }}
              >
                非表示にしたい投稿を選択してください
              </Box>
              <Box
                marginTop={4}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <CancelButton
                    size="medium"
                    onClick={handleDialogClose}
                    sx={{ minWidth: '120px' }}
                  >
                    戻る
                  </CancelButton>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  color: theme.palette.monitoring.hidden,
                  fontSize: '1.2rem',
                }}
              >
                一度非表示にしたものは、戻すことができません
              </Box>
              <Box
                marginTop={4}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <CancelButton
                    size="medium"
                    onClick={handleDialogClose}
                    sx={{ minWidth: '120px' }}
                  >
                    戻る
                  </CancelButton>
                  <HiddenButton
                    size="medium"
                    onClick={handleDialogHidden}
                    sx={{ minWidth: '120px' }}
                  >
                    非表示にする
                  </HiddenButton>
                </Box>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

ContentPageHidden.propTypes = {
  hiddenMode: PropTypes.bool.isRequired,
  curType: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};
