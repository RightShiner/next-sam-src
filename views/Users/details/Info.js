import _ from 'lodash';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import React, {useRef, useState} from 'react';
import {Box, Paper, Typography, TextField, Button} from '@mui/material';
import {userService} from 'services';

const Info = ({getDatas, classes}) => {

  const passRef = useRef();
  const passConfRef = useRef();

  const [userInfo, setUserInfo] = useState(getDatas());
  const [showDlg, setShowDlg] = useState(false);

  const setClicked = (e) => {
    if (passRef.current.value.trim() === '') {
      toast.error('パスワードを入力して下さい。');
      return;
    }
    if (passRef.current.value !== passConfRef.current.value) {
      toast.error('パスワードと確認用パスワードが一致していません。');
      return;
    }

    userService.changePwd(userInfo._id, passRef.current.value)
      .then((response) => {
        toast.success('パスワードを再設定しました');
        setShowDlg(false);
      });
  }

  const cancelClicked = (e) => {
    setShowDlg(false);
  }

  return (
    <Paper className="user-wrapper user-padding-small">
      <Typography className={classes.userdetailwrappertitle}>基本情報</Typography>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>会社名</Typography>
        <Typography>{userInfo.company}</Typography>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>HP</Typography>
        <Typography>{userInfo.url}</Typography>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>担当者名</Typography>
        <Typography>{userInfo.name}</Typography>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>電話番号</Typography>
        <Typography>{userInfo.phone}</Typography>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>メールアドレス</Typography>
        <Typography>{userInfo.email}</Typography>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>パスワード</Typography>
        <Typography 
          style={{textDecoration: 'underline', color: '#1123EF', cursor: 'pointer'}}
          onClick={e=>setShowDlg(true)}
        >
          再設定
        </Typography>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>住所</Typography>
        <Typography>{userInfo.addr}</Typography>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>利用規約</Typography>
        <Typography>{userInfo.isAgreed ? '同意済み' : '同意なし'}</Typography>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>TOKEN</Typography>
        <Typography className='token-wrapper'>{userInfo.token}</Typography>
      </Box>
      <Box className={classes.userdetailwrapper}>
        <Box />
        <Typography>Credits</Typography>
        <Typography>{userInfo.credits}</Typography>
      </Box>
      {showDlg && 
        <Box className={classes.passwordresetdlg} >
          <Box className={classes.passwordinput}>
            <Typography style={{marginRight:'.5rem'}}>パスワード</Typography>
            <TextField inputRef={passRef} size="small" type="password"></TextField>
          </Box>
          <Box className={classes.passwordinput}>
            <Typography style={{marginRight:'.5rem'}}>パスワード再入力</Typography>
            <TextField inputRef={passConfRef} size="small" type="password"></TextField>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
            <Button className="active" onClick={setClicked}>確定</Button>
            <Button sx={{marginLeft:'.5rem'}} onClick={cancelClicked} className="inactive">キャンセル</Button>
          </Box>
        </Box>
      }
    </Paper>
  );
};

export default Info;
