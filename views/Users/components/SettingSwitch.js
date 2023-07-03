import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import {Switch} from '@mui/material';

const SettingSwitch = ({initVal, type, field, updateStores}) => {
  const [data, setData] = useState(false);

  useEffect(() => {
    setData(initVal === true);
  }, [initVal]);

  const handleChange = (e) => {
    updateStores(type, field, e.target.checked ? 1 : 0);
    setData(e.target.checked);
  }

  return (
    <Switch
      checked={data}
      onChange={handleChange}
      inputProps={{style:{fontSize:'14px', textAlign:'right'}}}
    />
  );
};

export default SettingSwitch;
