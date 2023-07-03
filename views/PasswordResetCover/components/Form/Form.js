/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { userService } from 'services';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const lang = {
  en: {
    title: 'Password Reset',
    subtitle:
      'A password reset link will be sent to your registered email address.',
    label: 'Email',
    back: 'Back',
    submit: 'Send',
    errorUnregisteredEmail: 'Unregistered email address',
  },
  jp: {
    title: 'パスワードの再設定',
    subtitle:
      'ご登録いただいたメールアドレスにパスワード再設定用のリンクを送信します。',
    label: 'メールアドレス',
    back: 'ログインに戻る',
    submit: '送信',
    errorUnregisteredEmail: 'このメールアドレスのご登録はございません。',
  },
};

const Form = () => {
  const { locale } = useRouter();
  const initialValues = {
    email: '',
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .trim()
      .email(
        `${
          locale === 'en'
            ? 'Please enter in email address format.'
            : 'メールアドレス形式で入力してください。'
        }`,
      )
      .required(
        `${
          locale === 'en'
            ? 'Please enter your e-mail address.'
            : 'メールアドレスを入力してください。'
        }`,
      ),
  });

  const onSubmit = (values) => {
    return userService
      .emailCheck(values.email)
      .then((response) => {
        if (!response.status) {
          toast.error(lang[locale].errorUnregisteredEmail);
          return;
        }

        let url =
          publicRuntimeConfig.apiUrl.substring(
            0,
            publicRuntimeConfig.apiUrl.length - 3,
          ) + response.url;

        var formData = {
          to_email: values.email,
          to_name: response.name,
          recovery_url: url,
        };

        locale === 'en'
          ? emailjs
              .send(
                'service_vm5qekq',
                'template_om8l6pk',
                formData,
                'user_N3aAXWjxNdbi4jQ6uZHv6',
              )
              .then(
                (result) => {
                  toast.success('Sent successfully');
                },
                (error) => {
                  toast.error(error.text);
                },
              )
          : emailjs
              .send(
                'service_vm5qekq',
                'template_nc8zarb',
                formData,
                'user_N3aAXWjxNdbi4jQ6uZHv6',
              )
              .then(
                (result) => {
                  toast.success('送信しました。');
                },
                (error) => {
                  toast.error(error.text);
                },
              );
      })
      .catch((error) => {
        console.log(error.toString());
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          {lang[locale].title}
        </Typography>
        <Typography color="text.secondary">{lang[locale].subtitle}</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              label={lang[locale].label}
              variant="outlined"
              name={'email'}
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={'space-between'}
              width={1}
              maxWidth={600}
              margin={'0 auto'}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Button
                  size={'large'}
                  variant={'outlined'}
                  component={Link}
                  href={'/signin-cover'}
                  fullWidth
                >
                  {lang[locale].back}
                </Button>
              </Box>
              <Button size={'large'} variant={'contained'} type={'submit'}>
                {lang[locale].submit}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
