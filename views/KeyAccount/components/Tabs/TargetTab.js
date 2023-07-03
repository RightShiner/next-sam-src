import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';

import { keyaccountService } from 'services';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import {
  ApplyButton,
  ApplySection,
  UsernameField,
  TitleField,
  EmailField,
} from './common';
import { useRouter } from 'next/router';

const lang = {
  en: {
    type: 'Search a target',
    checked:
      'Based on the survey results, also search for influencers who are commonly directed by the target',
    yes: 'Yes',
    no: 'No',
    success: 'Your request has been submitted.',
  },
  jp: {
    type: 'ターゲットを探す',
    checked:
      '調査結果を元に、ターゲットが共通して支持しているインフルエンサーも探す',
    yes: 'あり',
    no: 'なし',
    success: '申請を送信しました。',
  },
};

const TargetTab = ({ userInfo }) => {
  const { locale } = useRouter();
  const [request, setRequest] = useState([]);

  const [userList, setUserList] = useState([]);
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState(userInfo.email);
  const [checked, setChecked] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    fetchRequest().catch(console.error);
  }, []);

  const fetchRequest = async () => {
    let res = await keyaccountService.getRequest('target');
    let data = res.data.map((item) => {
      return {
        title: item.title,
        email: item.email,
        date: new Date(item.createdAt).toLocaleDateString('ja-JA', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      };
    });
    setRequest(data);
  };

  const handleSubmit = async () => {
    if (
      userList.length >= 2 &&
      title !== '' &&
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
        email,
      )
    ) {
      const data = {
        type: 'target',
        checked,
        userList,
        title,
        email,
      };
      await keyaccountService.newRequest(data);
      fetchRequest().catch(console.error);
      const templateParams = {
        from_name: `${locale === 'en' ? 'Dear  ' : ''}${userInfo.name}${
          locale === 'jp' ? 'さん' : ''
        }(${userInfo.company})`,
        from_email: email,
        type: lang[locale].type,
        title,
        username: userList
          .map((itm) => {
            return itm.label;
          })
          .join(', '),
        checked: `${lang[locale].checked}: ${
          checked ? lang[locale].yes : lang[locale].no
        }`,
      };
      locale === 'en'
        ? emailjs
            .send(
              'service_vm5qekq',
              'template_c1ron6n',
              templateParams,
              'user_N3aAXWjxNdbi4jQ6uZHv6',
            )
            .then(
              (response) => {
                toast.success(lang[locale].success);
                console.log('SUCCESS!', response.status, response.text);
              },
              (err) => {
                toast.error(err.text);
                console.log('FAILED...', err);
              },
            )
        : emailjs
            .send(
              'service_vm5qekq',
              'template_t91cy5q',
              templateParams,
              'user_N3aAXWjxNdbi4jQ6uZHv6',
            )
            .then(
              (response) => {
                toast.success(lang[locale].success);
                console.log('SUCCESS!', response.status, response.text);
              },
              (err) => {
                toast.error(err.text);
                console.log('FAILED...', err);
              },
            );
      setUserList([]);
      setTitle('');
      setEmail('');
      setChecked(false);
    }
    if (userList.length < 2) {
      setUsernameError(true);
    }
    if (title === '') {
      setTitleError(true);
    }
    if (
      !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
        email,
      )
    ) {
      setEmailError(true);
    }
  };

  return (
    <>
      <UsernameField
        userList={userList}
        setUserList={setUserList}
        error={usernameError}
        setUsernameError={setUsernameError}
      />
      <TitleField
        title={title}
        setTitle={setTitle}
        error={titleError}
        setTitleError={setTitleError}
      />
      <EmailField
        email={email}
        setEmail={setEmail}
        error={emailError}
        setEmailError={setEmailError}
      />
      <FormGroup
        sx={{
          my: '1em',
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
              sx={{
                '&.Mui-checked': {
                  color: '#a17fef',
                },
              }}
            />
          }
          label={lang[locale].checked}
        />
      </FormGroup>
      <ApplyButton type="target" handleSubmit={handleSubmit} />
      <ApplySection type="target" request={request} />
    </>
  );
};

export default TargetTab;
