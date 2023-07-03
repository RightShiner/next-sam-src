import React, { useState, useRef, useCallback } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import validator from 'validator';
import _ from 'lodash';
import moment from 'moment';
import { trialService } from 'services';
import Checkbox from '@mui/material/Checkbox';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import emailjs from 'emailjs-com';

const step1Keys = [
  'company',
  'url',
  'zipaddr',
  'addr',
  'name_sei',
  'name_mei',
  'sales_person',
];
const step2Keys = ['email', 'phone', 'password', 'password_confirm'];
const allKeys = step1Keys.concat(step2Keys);

const RequiredLabel = () => {
  return (
    <Box
      sx={{
        display: 'inline-block',
        paddingX: 1,
        paddingTop: 0.4,
        paddingBottom: 0.1,
        marginLeft: 1,
        color: '#fff',
        backgroundColor: '#E1606F',
        borderRadius: '4px',
        fontSize: '0.65rem',
      }}
    >
      必須
    </Box>
  );
};

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    borderRadius: 12,
  },
  '& .Mui-error.MuiInputBase-root': {
    backgroundColor: '#FFEFF1',
  },
  '& input': {
    padding: '14px',
  },
});

const Detail = ({ trialId }) => {
  const router = useRouter();
  const [accept, setAccept] = useState(false);
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({});
  const now = Date.now();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    moment(now)
      .add(7, 'days')
      .format('YYYY/MM/DD'),
  );
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [isProgressModalOpen, setIsProgressModalOpen] = React.useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((showPassword) => !showPassword);
  }, []);

  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  let refObjects = {};
  for (let key of allKeys) {
    refObjects[key] = useRef();
  }

  const focusOtherInput = (idx) => {
    refObjects[idx].current.focus();
  };

  const nextStep = useCallback(() => {
    let inputs = {};
    let errors = {};

    step1Keys.forEach((key) => {
      inputs[key] = refObjects[key].current.value;
      if (refObjects[key].current.required && !refObjects[key].current.value) {
        errors[key] = '入力してください';
      } else {
        delete errors[key];
      }
    });

    if (!errors['zipaddr']) {
      if (!validator.isNumeric(inputs['zipaddr'])) {
        errors['zipaddr'] = 'ハイフンなしで入力してください';
      }
    }

    setInputs((lastInputs) => {
      return {
        ...lastInputs,
        ...inputs,
      };
    });
    setErrors(errors);

    if (_.isEmpty(errors)) {
      setStep(2);
    }
  }, [refObjects]);

  const prevStep = useCallback(() => {
    let inputs = {};
    step2Keys.forEach((key) => {
      inputs[key] = refObjects[key].current.value;
    });
    setInputs((lastInputs) => {
      return {
        ...lastInputs,
        ...inputs,
      };
    });
    setStep(1);
  }, [refObjects]);

  const handleAcceptChange = useCallback(() => {
    setAccept((accept) => !accept);
  }, []);

  const createUser = useCallback(async () => {
    let newInputs = {};
    let errors = {};

    step2Keys.forEach((key) => {
      newInputs[key] = refObjects[key].current.value;
      if (refObjects[key].current.required && !refObjects[key].current.value) {
        errors[key] = '入力してください';
      } else {
        delete errors[key];
      }
    });

    if (!validator.isDate(startDate, { delimiters: '-' })) {
      errors['startDate'] = '開始日を正しく入力してください';
    } else {
      delete errors['startDate'];
    }

    if (!validator.isEmail(newInputs['email'])) {
      errors['email'] = 'メールアドレスを正確に入力して下さい。';
    } else {
      if (
        !validator.isEmail(newInputs['email'], {
          host_blacklist: [
            'gmail.com',
            'yahoo.co.jp',
            'yahoo.com',
            'outlook.com',
            'icloud.com',
          ],
        })
      ) {
        errors['email'] = 'gmailなどのフリーアドレスは対象外です。';
      } else {
        delete errors['email'];
      }
    }

    if (!validator.isLength(newInputs['password'], { min: 8 })) {
      errors['password'] = '8文字以上入力してください';
    } else {
      if (!validator.isAlphanumeric(newInputs['password'])) {
        errors['password'] = '半角英字が必要です';
      } else {
        delete errors['password'];
      }
    }

    if (!errors['phone']) {
      if (!validator.isNumeric(newInputs['phone'])) {
        errors['phone'] = 'ハイフンなしで入力してください';
      }
    }

    if (newInputs['password'] !== newInputs['password_confirm']) {
      errors['password_confirm'] = '入力内容が異なります';
    } else {
      delete errors['password_confirm'];
    }

    setInputs((lastInputs) => {
      return {
        ...lastInputs,
        ...newInputs,
      };
    });
    setErrors(errors);

    if (!_.isEmpty(errors)) {
      return;
    }

    const name = `${inputs['name_sei']} ${inputs['name_mei']}`;
    const addr = `${inputs['zipaddr']} ${inputs['addr']}`;
    const paystart = moment(startDate).format('YYYY-MM-DD');
    const payend = moment(endDate).format('YYYY-MM-DD');
    const payload = { ...inputs, ...newInputs, name, paystart, payend, addr };
    delete payload['password_confirm'];
    delete payload['zipaddr'];
    delete payload['name_sei'];
    delete payload['name_mei'];

    setIsProgressModalOpen(true);
    const res = await trialService.createUser(trialId, payload);
    setIsProgressModalOpen(false);

    emailjs
      .send(
        'service_vm5qekq',
        'template_o7gnv81',
        {
          to_email: newInputs['email'],
        },
        'user_N3aAXWjxNdbi4jQ6uZHv6',
      )
      .then(
        (result) => {
          console.log('email send success');
        },
        (error) => {
          console.log('email send error', error);
        },
      );

    if (res.status !== 'ok') {
      alert(res.msg);
    } else {
      setStep(3);
    }
  }, [refObjects, inputs, startDate, endDate, trialId, router]);

  const handleLogin = useCallback(() => {
    router.push({ pathname: '/signin-cover' });
  }, [router]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        '@media screen and (min-width:600px)': {
          padding: 2,
          backgroundImage: 'url(/images/trial/bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        },
      }}
    >
      <Paper
        className=""
        sx={{
          padding: 2,
          paddingBottom: 4,
          width: '100%',
          maxWidth: 600,
          marginX: 'auto',
          borderRadius: '0px',
          '@media screen and (min-width:600px)': {
            padding: 4,
            borderRadius: '20px',
          },
        }}
      >
        <Box>
          <Box
            display={'block'}
            component={'img'}
            src={'/images/logo/logo.png'}
            width={{ xs: 180, md: 220 }}
            height={1}
            sx={{ marginX: 'auto' }}
          />
        </Box>
        {step === 1 && (
          <>
            <Typography
              variant="h5"
              sx={{
                marginTop: 3,
                '@media screen and (min-width:600px)': {
                  marginTop: 2,
                  textAlign: 'center',
                },
              }}
            >
              ようこそ！A STREAMへ
            </Typography>
            <Typography
              sx={{
                marginTop: 0.5,
                fontSize: '0.8rem',
                '@media screen and (min-width:600px)': {
                  textAlign: 'center',
                  fontSize: '0.9rem',
                },
              }}
            >
              ターゲティングを実現するインフルエンサーマーケティングツール
            </Typography>
            <Box
              sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 0.5,
                }}
              >
                <Typography
                  sx={{
                    marginTop: 0.7,
                    fontSize: '0.95rem',
                  }}
                >
                  会社名
                </Typography>
                <RequiredLabel />
              </Box>
              <CustomTextField
                name="company"
                variant="outlined"
                defaultValue={inputs['company']}
                inputRef={refObjects['company']}
                required
                onKeyDown={(e) =>
                  e.keyCode === 13 ? focusOtherInput('url') : ''
                }
                error={!!errors['company']}
              />
              {!!errors['company'] && (
                <Typography
                  sx={{
                    color: '#E1606F',
                    marginTop: 0.8,
                    fontSize: '0.8rem',
                  }}
                >
                  {errors['company']}
                </Typography>
              )}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 2,
                  marginBottom: 0.5,
                }}
              >
                <Typography
                  sx={{
                    marginTop: 0.7,
                    fontSize: '0.95rem',
                  }}
                >
                  ホームページURL
                </Typography>
                <RequiredLabel />
              </Box>
              <CustomTextField
                name="url"
                placeholder="ない場合は「なし」とご記入ください。"
                variant="outlined"
                defaultValue={inputs['url']}
                inputRef={refObjects['url']}
                required
                onKeyDown={(e) =>
                  e.keyCode === 13 ? focusOtherInput('zipaddr') : ''
                }
                error={!!errors['url']}
              />
              {!!errors['url'] && (
                <Typography
                  sx={{
                    color: '#E1606F',
                    marginTop: 0.8,
                    fontSize: '0.8rem',
                  }}
                >
                  {errors['url']}
                </Typography>
              )}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 2,
                  marginBottom: 0.5,
                }}
              >
                <Typography
                  sx={{
                    marginTop: 0.7,
                    fontSize: '0.95rem',
                  }}
                >
                  会社所在地
                </Typography>
                <RequiredLabel />
              </Box>
              <CustomTextField
                name="zipaddr"
                placeholder="郵便番号（ハイフンなし）"
                variant="outlined"
                defaultValue={inputs['zipaddr']}
                inputRef={refObjects['zipaddr']}
                required
                inputProps={{ maxLength: 7 }}
                onKeyDown={(e) =>
                  e.keyCode === 13 ? focusOtherInput('addr') : ''
                }
                sx={{
                  width: '220px',
                }}
                error={!!errors['zipaddr']}
              />
              {!!errors['zipaddr'] && (
                <Typography
                  sx={{
                    color: '#E1606F',
                    marginTop: 0.8,
                    fontSize: '0.8rem',
                  }}
                >
                  {errors['zipaddr']}
                </Typography>
              )}
              <CustomTextField
                name="addr"
                variant="outlined"
                defaultValue={inputs['addr']}
                inputRef={refObjects['addr']}
                required
                placeholder={
                  '東京都渋谷区渋谷2-24-12 渋谷スクランブルスクエア39F'
                }
                onKeyDown={(e) =>
                  e.keyCode === 13 ? focusOtherInput('name_sei') : ''
                }
                sx={{
                  marginTop: 1.5,
                }}
                error={!!errors['addr']}
              />
              {!!errors['addr'] && (
                <Typography
                  sx={{
                    color: '#E1606F',
                    marginTop: 0.8,
                    fontSize: '0.8rem',
                  }}
                >
                  {errors['addr']}
                </Typography>
              )}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 2,
                  marginBottom: 0.5,
                }}
              >
                <Typography
                  sx={{
                    marginTop: 0.7,
                    fontSize: '0.95rem',
                  }}
                >
                  お名前（フルネーム）
                </Typography>
                <RequiredLabel />
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr));',
                  gap: '2rem',
                }}
              >
                <CustomTextField
                  name="name_sei"
                  variant="outlined"
                  defaultValue={inputs['name_sei']}
                  inputRef={refObjects['name_sei']}
                  required
                  placeholder={'姓'}
                  onKeyDown={(e) =>
                    e.keyCode === 13 ? focusOtherInput('name_mei') : ''
                  }
                  error={!!errors['name_sei']}
                />
                <CustomTextField
                  name="name_mei"
                  variant="outlined"
                  defaultValue={inputs['name_mei']}
                  inputRef={refObjects['name_mei']}
                  required
                  placeholder={'名'}
                  onKeyDown={(e) =>
                    e.keyCode === 13 ? focusOtherInput('sales_person') : ''
                  }
                  error={!!errors['name_mei']}
                />
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr));',
                  gap: '2rem',
                }}
              >
                <Box>
                  {!!errors['name_sei'] && (
                    <Typography
                      sx={{
                        color: '#E1606F',
                        marginTop: 0.8,
                        fontSize: '0.8rem',
                      }}
                    >
                      {errors['name_sei']}
                    </Typography>
                  )}
                </Box>
                <Box>
                  {!!errors['name_mei'] && (
                    <Typography
                      sx={{
                        color: '#E1606F',
                        marginTop: 0.8,
                        fontSize: '0.8rem',
                      }}
                    >
                      {errors['name_mei']}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 2,
                  marginBottom: 0.5,
                }}
              >
                <Typography
                  sx={{
                    marginTop: 0.7,
                    fontSize: '0.95rem',
                  }}
                >
                  商談担当者名（株式会社Aの担当者名）
                </Typography>
                <RequiredLabel />
              </Box>
              <CustomTextField
                name="sales_person"
                variant="outlined"
                defaultValue={inputs['sales_person']}
                inputRef={refObjects['sales_person']}
                required
                error={!!errors['sales_person']}
              />
              {!!errors['sales_person'] && (
                <Typography
                  sx={{
                    color: '#E1606F',
                    marginTop: 0.8,
                    fontSize: '0.8rem',
                  }}
                >
                  {errors['sales_person']}
                </Typography>
              )}
            </Box>
            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
              <Button
                fullWidth
                variant={'outlined'}
                onClick={(e) => nextStep()}
                sx={{
                  fontWeight: 'bold',
                  paddingTop: 1.5,
                  paddingBottom: 0.8,
                  backgroundColor: '#000',
                  borderColor: '#000',
                  borderRadius: '5px',
                  color: '#fff',
                  '&.MuiButton-root': {
                    borderRadius: '8px !important',
                  },
                  '&.MuiButton-root:hover': {
                    opacity: 0.8,
                    borderColor: '#000',
                    backgroundColor: '#000',
                  },
                }}
              >
                次へ
              </Button>
            </Box>
          </>
        )}
        {step === 2 && (
          <>
            <Typography
              variant="h5"
              sx={{
                marginTop: 3,
                '@media screen and (min-width:600px)': {
                  marginTop: 2,
                  textAlign: 'center',
                },
              }}
            >
              アカウント情報を入力してください
            </Typography>
            <Box
              sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 0.5,
                }}
              >
                <Typography
                  sx={{
                    marginTop: 0.7,
                    fontSize: '0.95rem',
                  }}
                >
                  メールアドレス
                </Typography>
                <RequiredLabel />
              </Box>
              <CustomTextField
                name="email"
                variant="outlined"
                defaultValue={inputs['email']}
                inputRef={refObjects['email']}
                required
                onKeyDown={(e) =>
                  e.keyCode === 13 ? focusOtherInput('phone') : ''
                }
                error={!!errors['email']}
              />
              {!!errors['email'] && (
                <Typography
                  sx={{
                    color: '#E1606F',
                    marginTop: 0.8,
                    fontSize: '0.8rem',
                  }}
                >
                  {errors['email']}
                </Typography>
              )}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 2,
                  marginBottom: 0.5,
                }}
              >
                <Typography
                  sx={{
                    marginTop: 0.7,
                    fontSize: '0.95rem',
                  }}
                >
                  電話番号（ハイフンなし）
                </Typography>
                <RequiredLabel />
              </Box>
              <CustomTextField
                name="phone"
                placeholder="07012345678"
                variant="outlined"
                defaultValue={inputs['phone']}
                inputRef={refObjects['phone']}
                required
                inputProps={{ maxLength: 13 }}
                onKeyDown={(e) =>
                  e.keyCode === 13 ? focusOtherInput('password') : ''
                }
                error={!!errors['phone']}
              />
              {!!errors['phone'] && (
                <Typography
                  sx={{
                    color: '#E1606F',
                    marginTop: 0.8,
                    fontSize: '0.8rem',
                  }}
                >
                  {errors['phone']}
                </Typography>
              )}
              <Box
                sx={{
                  display: 'grid',
                  gap: '10px',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  '@media screen and (min-width:600px)': {
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  },
                  marginTop: 2,
                  marginBottom: 0.5,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      marginTop: 0.7,
                      fontSize: '0.95rem',
                    }}
                  >
                    アカウント開始日
                  </Typography>
                  <RequiredLabel />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      marginTop: 0.7,
                      fontSize: '0.95rem',
                    }}
                  >
                    アカウント終了日
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 2,
                  marginBottom: 0.5,
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={startDate}
                      onChange={(newValue) => {
                        setStartDate(newValue);
                        const endDate = moment(newValue)
                          .add(7, 'days')
                          .format('YYYY/MM/DD');
                        setEndDate(endDate);
                      }}
                      inputFormat={'yyyy/MM/dd'}
                      renderInput={(params) => <CustomTextField {...params} />}
                      disablePast
                    />
                  </LocalizationProvider>
                </Box>
                <Box
                  sx={{
                    width: '20px',
                    height: '1px',
                    border: '1px solid #000',
                    marginX: 2,
                    '@media screen and (min-width:600px)': {
                      marginX: 4,
                    },
                  }}
                ></Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Typography>{endDate}</Typography>
                </Box>
              </Box>
              {!!errors['startDate'] && (
                <Typography
                  sx={{
                    color: '#E1606F',
                    marginTop: 0.8,
                    fontSize: '0.8rem',
                  }}
                >
                  {errors['startDate']}
                </Typography>
              )}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 2,
                  marginBottom: 0.5,
                }}
              >
                <Typography
                  sx={{
                    marginTop: 0.7,
                    fontSize: '0.95rem',
                  }}
                >
                  設定パスワード（半角英数8ケタ以上）
                </Typography>
                <RequiredLabel />
              </Box>
              <CustomTextField
                name="password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                minRows={7}
                defaultValue={inputs['password']}
                inputRef={refObjects['password']}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                onKeyDown={(e) =>
                  e.keyCode === 13 ? focusOtherInput('password_confirm') : ''
                }
                sx={{
                  marginTop: 1.5,
                }}
                error={!!errors['password']}
              />
              {!!errors['password'] && (
                <Typography
                  sx={{
                    color: '#E1606F',
                    marginTop: 0.8,
                    fontSize: '0.8rem',
                  }}
                >
                  {errors['password']}
                </Typography>
              )}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 2,
                  marginBottom: 0.5,
                }}
              >
                <Typography
                  sx={{
                    marginTop: 0.7,
                    fontSize: '0.95rem',
                  }}
                >
                  設定パスワード（確認）
                </Typography>
                <RequiredLabel />
              </Box>
              <CustomTextField
                name="password_confirm"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                defaultValue={inputs['password_confirm']}
                inputRef={refObjects['password_confirm']}
                placeholder={'同じパスワードを入力してください'}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                error={!!errors['password_confirm']}
              />
              {!!errors['password_confirm'] && (
                <Typography
                  sx={{
                    color: '#E1606F',
                    marginTop: 0.8,
                    fontSize: '0.8rem',
                  }}
                >
                  {errors['password_confirm']}
                </Typography>
              )}
              <Box sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  id="accept"
                  color="primary"
                  checked={accept}
                  onChange={handleAcceptChange}
                />
                <label htmlFor="accept">
                  <Typography sx={{ fontSize: '0.9rem' }}>
                    <a href="/terms" target="_blank">
                      利用規約
                    </a>
                    に同意する
                  </Typography>
                </label>
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: 4,
                display: 'grid',
                gap: '10px',
                gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
                '@media screen and (min-width:600px)': {
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                },
              }}
            >
              <Button
                fullWidth
                variant={'outlined'}
                onClick={(e) => prevStep()}
                sx={{
                  fontWeight: 'bold',
                  paddingTop: 1.5,
                  paddingBottom: 0.8,
                  backgroundColor: '#E0E0E0',
                  borderColor: '#E0E0E0',
                  borderRadius: '5px',
                  color: '#000',
                  '&.MuiButton-root': {
                    borderRadius: '8px !important',
                  },
                  '&.MuiButton-root:hover': {
                    opacity: 0.8,
                    borderColor: '#E0E0E0',
                    backgroundColor: '#E0E0E0',
                  },
                }}
              >
                戻る
              </Button>
              <Button
                fullWidth
                variant={'outlined'}
                onClick={(e) => createUser()}
                sx={{
                  fontWeight: 'bold',
                  paddingTop: 1.5,
                  paddingBottom: 0.8,
                  backgroundColor: '#3670C6',
                  borderColor: '#3670C6',
                  borderRadius: '5px',
                  color: '#fff',
                  '&.MuiButton-root': {
                    borderRadius: '8px !important',
                  },
                  '&.MuiButton-root:hover': {
                    opacity: 0.8,
                    borderColor: '#3670C6',
                    backgroundColor: '#3670C6',
                  },
                }}
                disabled={!accept}
              >
                トライアルをはじめる
              </Button>
            </Box>
          </>
        )}
        {step === 3 && (
          <Box>
            <Typography
              variant="h5"
              sx={{
                marginTop: 3,
                '@media screen and (min-width:600px)': {
                  marginTop: 2,
                  textAlign: 'center',
                },
              }}
            >
              {inputs['email']}宛てにメールを送信しました
            </Typography>
            <Typography
              sx={{
                color: '#E5466C',
                marginTop: 1,
                fontSize: '0.8rem',
                '@media screen and (min-width:600px)': {
                  textAlign: 'center',
                  fontSize: '0.9rem',
                },
              }}
            >
              届かない場合、迷惑メールに入っている可能がございます。 <br />
              ご注意ください。
            </Typography>
            <Box
              component="img"
              src="/images/trial/complete.png"
              sx={{
                display: 'block',
                maxWidth: '300px',
                width: '100%',
                margin: '1rem auto 3rem',
              }}
            />
            <Typography
              variant="h5"
              sx={{
                marginTop: 1,
                '@media screen and (min-width:600px)': {
                  textAlign: 'center',
                },
              }}
            >
              メールのURLをクリックして、 <br />A STREAMを体感しましょう。
            </Typography>
            <Typography
              sx={{
                marginTop: 1.5,
                fontSize: '0.8rem',
                '@media screen and (min-width:600px)': {
                  textAlign: 'center',
                  fontSize: '0.9rem',
                },
              }}
            >
              ※メールが届かない場合は、担当者へご連絡ください。
            </Typography>
            <Box sx={{ marginTop: 4 }}>
              <Button
                fullWidth
                variant={'outlined'}
                onClick={handleLogin}
                sx={{
                  fontWeight: 'bold',
                  paddingTop: 1.5,
                  paddingBottom: 0.8,
                  backgroundColor: '#3670C6',
                  borderColor: '#3670C6',
                  borderRadius: '5px',
                  color: '#fff',
                  '&.MuiButton-root': {
                    borderRadius: '8px !important',
                  },
                  '&.MuiButton-root:hover': {
                    opacity: 0.8,
                    borderColor: '#3670C6',
                    backgroundColor: '#3670C6',
                  },
                }}
              >
                ログイン
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
      <Modal open={isProgressModalOpen}>
        <LinearProgress />
      </Modal>
    </Box>
  );
};

export default Detail;
