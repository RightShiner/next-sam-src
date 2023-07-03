import React from 'react';
import { ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const PostDetailAction = ({
  anchorEl,
  menuOpen,
  setEditOpen,
  setDeleteOpen,
  handleMenuClose,
}) => {
  return (
    <Menu
      id="long-menu"
      MenuListProps={{
        'aria-labelledby': 'long-button',
      }}
      anchorEl={anchorEl}
      open={menuOpen}
      onClose={handleMenuClose}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        style: {
          width: '20ch',
        },
      }}
    >
      <MenuItem onClick={() => setEditOpen(true)}>編集</MenuItem>
      <MenuItem onClick={() => setDeleteOpen(true)}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" sx={{ color: '#E5466C' }} />
        </ListItemIcon>
        <Typography sx={{ color: '#E5466C' }}>削除</Typography>
      </MenuItem>
    </Menu>
  );
};

export default PostDetailAction;
