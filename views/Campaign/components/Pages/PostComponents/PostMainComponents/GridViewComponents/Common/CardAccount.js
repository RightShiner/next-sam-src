import React, { useState, useContext } from 'react';
import { Avatar, Stack, IconButton, Paper } from '@mui/material';
import Link from 'next/link';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { modalContext } from '../../../PostPageMain';

const CardAccount = ({ data }) => {
  let accountInfo = data?.inf_profile.profile;
  const { handleMenuOpen } = useContext(modalContext);
  return (
    <Stack
      spacing="10px"
      direction="row"
      className="card_account"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack spacing={2} direction="row" alignItems="center">
        <Avatar
          alt="account"
          className="avatar"
          src={accountInfo?.picture}
          aria-label="recipe"
        />
        <Link variant="body" component={'a'} href={accountInfo?.url ?? ''}>
          <a target="_blank">{accountInfo?.fullname}</a>
        </Link>
      </Stack>
      <IconButton size="small">
        <MoreHorizIcon
          onClick={handleMenuOpen(data?.pk)}
          sx={{ color: 'rgba(48, 48, 48, 0.5)' }}
        />
      </IconButton>
    </Stack>
  );
};

export default CardAccount;
