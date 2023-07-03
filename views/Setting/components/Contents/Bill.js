/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash';
import clsx from 'clsx';
import validator from 'validator';
import toast from 'react-hot-toast';
import React, { useMemo, useRef, useState } from 'react';
import { Skeleton, Box, Button, Typography, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import styles from './styles';
import { userService } from 'services';
import { useRouter } from 'next/router';

const lang = {
  en: {
    basic: 'Basic information',
    companyName: 'Company name',
    manager: 'Manager name',
    phone: 'Phone number',
    email: 'Email',
    password: 'Password',
    reset: 'Reset',
    address: 'Address',
    edit: 'Edit',
    confirm: 'Retype',
    ok: 'OK',
    cancel: 'Cancel',
    save: 'Save',
    errorCompany: 'Please enter the company name.',
    errorURL: 'Please enter the URL',
    errorManager: 'Please enter the manager name',
    errorPhone: 'Please enter the phone number',
    errorEmail: 'Please enter the email address',
    errorEmailValid: 'Please enter the email address correctly.',
    errorAddress: 'Please enter the address',
    errorPwd: 'Please enter the password',
    errorPwdDiff: 'Passwords are not the same',
    success: 'Update successfully',
    successReset: 'Reset password successfully',
  },
  jp: {
    basic: '基本情報',
    companyName: '会社名',
    manager: '担当者名',
    phone: '電話番号',
    email: 'メールアドレス',
    password: 'パスワード',
    reset: '再設定',
    address: '住所',
    edit: '編集',
    confirm: 'パスワード再入力',
    ok: '確定',
    cancel: 'キャンセル',
    save: '保存',
    errorCompany: '会社名を入力して下さい',
    errorURL: 'URLを入力して下さい',
    errorManager: '担当者名を入力して下さい',
    errorPhone: '電話番号を入力して下さい',
    errorEmail: 'メールアドレスを入力して下さい',
    errorEmailValid: 'メールアドレスを正確に入力して下さい。',
    errorAddress: '住所を入力して下さい',
    errorPwd: 'パスワードを入力して下さい。',
    errorPwdDiff: 'パスワードとパスワードが違いです',
    success: '更新しました。',
    successReset: 'パスワードを再設定しました',
  },
};

const Bill = ({ isLoading, userInfo, refreshUserInfo, ...rest }) => {
  const { locale } = useRouter();
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, { defaultTheme: theme });
  }, [theme]);
  const classes = useStyles();

  const companyRef = useRef();
  const urlRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const newpassRef = useRef();
  const addrRef = useRef();
  const [editDlg, showEditDlg] = useState(false);

  const saveContent = (e) => {
    if (companyRef.current.value.trim() === '') {
      toast.error(lang[locale].errorCompany);
      return;
    }
    if (urlRef.current.value.trim() === '') {
      toast.error(lang[locale].errorURL);
      return;
    }
    if (nameRef.current.value.trim() === '') {
      toast.error(lang[locale].errorManager);
      return;
    }
    if (phoneRef.current.value.trim() === '') {
      toast.error(lang[locale].errorPhone);
      return;
    }
    if (emailRef.current.value.trim() === '') {
      toast.error(lang[locale].errorEmail);
      return;
    }
    if (!validator.isEmail(emailRef.current.value)) {
      toast.error(lang[locale].errorEmailValid);
      return;
    }
    if (addrRef.current.value.trim() === '') {
      toast.error(lang[locale].errorAddress);
      return;
    }

    let obj = {
      company: companyRef.current.value,
      url: urlRef.current.value,
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      addr: addrRef.current.value,
    };
    if (newpassRef.current.value.trim() !== '') {
      obj.password = newpassRef.current.value;
    }

    userService
      .updateUser(obj)
      .then((response) => {
        if (response.status === 'ok') {
          toast.success(lang[locale].success);
          refreshUserInfo();
          showEditDlg(false);
        } else toast.error(response.msg);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const openContent = (e) => {
    companyRef.current.value = userInfo.company;
    urlRef.current.value = userInfo.url;
    nameRef.current.value = userInfo.name;
    phoneRef.current.value = userInfo.phone;
    emailRef.current.value = userInfo.email;
    newpassRef.current.value = '';
    addrRef.current.value = userInfo.addr;

    showEditDlg(true);
  };

  const passRef = useRef();
  const passConfRef = useRef();

  const [showDlg, setShowDlg] = useState(false);
  const setClicked = (e) => {
    if (passRef.current.value.trim() === '') {
      toast.error(lang[locale].errorPwd);
      return;
    }
    if (passRef.current.value !== passConfRef.current.value) {
      toast.error(lang[locale].errorPwdDiff);
      return;
    }

    userService
      .changePwd(userInfo._id, passRef.current.value)
      .then((response) => {
        toast.success(lang[locale].successReset);
        setShowDlg(false);
      });
  };

  const setAgreeClicked = async (e) => {
    await userService.setAgree(userInfo._id);
    setIsAgreed(true);
  };

  const cancelClicked = (e) => {
    setShowDlg(false);
  };

  const [isAgreed, setIsAgreed] = useState(userInfo?.isAgreed ?? false);

  return (
    <Box className="billWrapper" {...rest}>
      <Box className={clsx(classes.contentWrapper, classes.bigShadow)}>
        <Typography className={classes.boldFont} variant={'h5'}>
          {lang[locale].basic}
        </Typography>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>{lang[locale].companyName}</Typography>
          {isLoading ? (
            <Skeleton width={120} height={25} sx={{ transform: 'unset' }} />
          ) : (
            <Typography>{userInfo.company ?? ''}</Typography>
          )}
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>HP</Typography>
          {isLoading ? (
            <Skeleton width={120} height={25} sx={{ transform: 'unset' }} />
          ) : (
            <Typography>{userInfo.url ?? ''}</Typography>
          )}
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>{lang[locale].manager}</Typography>
          {isLoading ? (
            <Skeleton width={120} height={25} sx={{ transform: 'unset' }} />
          ) : (
            <Typography>{userInfo.name ?? ''}</Typography>
          )}
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>{lang[locale].phone}</Typography>
          {isLoading ? (
            <Skeleton width={120} height={25} sx={{ transform: 'unset' }} />
          ) : (
            <Typography>{userInfo.phone ?? ''}</Typography>
          )}
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>{lang[locale].email}</Typography>
          {isLoading ? (
            <Skeleton width={120} height={25} sx={{ transform: 'unset' }} />
          ) : (
            <Typography>{userInfo.email ?? ''}</Typography>
          )}
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>{lang[locale].password}</Typography>
          {isLoading ? (
            <Skeleton width={120} height={25} sx={{ transform: 'unset' }} />
          ) : (
            <Typography
              style={{
                textDecoration: 'underline',
                color: '#1123EF',
                cursor: 'pointer',
              }}
              onClick={(e) => setShowDlg(true)}
            >
              {lang[locale].reset}
            </Typography>
          )}
        </Box>
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Typography>{lang[locale].address}</Typography>
          {isLoading ? (
            <Skeleton width={120} height={25} sx={{ transform: 'unset' }} />
          ) : (
            <Typography>{userInfo.addr ?? ''}</Typography>
          )}
        </Box>
        {process.env.NEXT_PUBLIC_REGION != 'SG' && (
          <Box className={classes.userdetailwrapper}>
            <Box />
            <Typography>利用規約</Typography>
            {isLoading ? (
              <Skeleton width={120} height={25} sx={{ transform: 'unset' }} />
            ) : isAgreed ? (
              <Typography>同意済み</Typography>
            ) : (
              <Box>
                <Button
                  className="active"
                  onClick={setAgreeClicked}
                  size="small"
                >
                  確認する
                </Button>
              </Box>
            )}
          </Box>
        )}
        <Box className={classes.userdetailwrapper}>
          <Box />
          <Box />
          <Box>
            <Button className="active" onClick={openContent} size="small">
              {lang[locale].edit}
            </Button>
          </Box>
        </Box>
      </Box>
      {showDlg && (
        <Box className={classes.passwordresetdlg}>
          <Box className={classes.passwordinput}>
            <Typography style={{ marginRight: '.5rem' }}>
              {lang[locale].password}
            </Typography>
            <TextField
              inputRef={passRef}
              size="small"
              type="password"
            ></TextField>
          </Box>
          <Box className={classes.passwordinput}>
            <Typography style={{ marginRight: '.5rem' }}>
              {lang[locale].confirm}
            </Typography>
            <TextField
              inputRef={passConfRef}
              size="small"
              type="password"
            ></TextField>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            <Button className="active" onClick={setClicked}>
              {lang[locale].ok}
            </Button>
            <Button
              sx={{ marginLeft: '.5rem' }}
              onClick={cancelClicked}
              className="inactive"
            >
              {lang[locale].cancel}
            </Button>
          </Box>
        </Box>
      )}
      <Box
        className={clsx(classes.passwordresetdlg, classes.editdlg)}
        sx={{ display: `${editDlg === true ? 'block' : 'none'}` }}
      >
        <Box className={classes.passwordinput}>
          <Typography style={{ marginRight: '.5rem' }}>
            {lang[locale].companyName}
          </Typography>
          <TextField inputRef={companyRef} size="small"></TextField>
        </Box>
        <Box className={classes.passwordinput}>
          <Typography style={{ marginRight: '.5rem' }}>HP</Typography>
          <TextField inputRef={urlRef} size="small"></TextField>
        </Box>
        <Box className={classes.passwordinput}>
          <Typography style={{ marginRight: '.5rem' }}>
            {lang[locale].manager}
          </Typography>
          <TextField inputRef={nameRef} size="small"></TextField>
        </Box>
        <Box className={classes.passwordinput}>
          <Typography style={{ marginRight: '.5rem' }}>
            {lang[locale].phone}
          </Typography>
          <TextField inputRef={phoneRef} size="small"></TextField>
        </Box>
        <Box className={classes.passwordinput}>
          <Typography style={{ marginRight: '.5rem' }}>
            {lang[locale].email}
          </Typography>
          <TextField inputRef={emailRef} size="small"></TextField>
        </Box>
        <Box className={classes.passwordinput}>
          <Typography style={{ marginRight: '.5rem' }}>
            {lang[locale].password}
          </Typography>
          <TextField
            inputRef={newpassRef}
            size="small"
            type="password"
          ></TextField>
        </Box>
        <Box className={classes.passwordinput}>
          <Typography style={{ marginRight: '.5rem' }}>
            {lang[locale].address}
          </Typography>
          <TextField inputRef={addrRef} size="small"></TextField>
        </Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
        >
          <Button className="active" onClick={saveContent}>
            {lang[locale].save}
          </Button>
          <Button
            sx={{ marginLeft: '.5rem' }}
            onClick={(e) => showEditDlg(false)}
            className="inactive"
          >
            {lang[locale].cancel}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Bill;
