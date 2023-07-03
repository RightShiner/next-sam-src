/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useMainContext } from 'context/MainContext';
import { Plan, Bill, Upgrade } from './Contents';
import { planService } from 'services';

const PlanContent = ({ user, switchToUpgrade, selType }) => {
  const { setLoginUser } = useMainContext();
  const [isLoading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    setLoginUser(user);

    setLoading(true);
    reloadUserInfo();
  }, [user]);

  const reloadUserInfo = () => {
    return planService.getUserInfo(user.id).then((response) => {
      setUserInfo({ ...response.data });
      setLoading(false);
    });
  };

  return (
    <Box>
      <Plan
        user={user}
        switchToUpgrade={switchToUpgrade}
        display={`${selType === 'plan' ? 'block' : 'none'}`}
        sx={{
          width: 'fit-content',
        }}
      />
      <Bill
        isLoading={isLoading}
        userInfo={userInfo}
        display={`${selType === 'bill' ? 'block' : 'none'}`}
        refreshUserInfo={reloadUserInfo}
      />
      <Upgrade
        userInfo={userInfo}
        display={`${selType === 'upgrade' ? 'block' : 'none'}`}
        sx={{
          width: 'min-content',
        }}
      />
    </Box>
  );
};

PlanContent.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    role: PropTypes.string,
  }),
  selType: PropTypes.string,
};

export default PlanContent;
