import _ from 'lodash';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  MenuItem,
} from '@mui/material';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { campaignService } from 'services';
import toast from 'react-hot-toast';

const lang = {
  en: {
    title: 'Create Campaign',
    name: 'Campaign name',
    errorName: 'Please enter a campaign name.',
    errorSNS: 'Please select an SNS.',
    errorType: 'Please select a genre.',
  },
  jp: {
    title: 'キャンペーン作成',
    name: 'キャンペーン名',
    errorName: 'キャンペーン名をご入力してください。',
    errorSNS: 'SNSを選択してください。',
    errorType: 'ジャンルを選択してください。',
  },
};

const New = ({ userInfo }) => {
  const router = useRouter();
  const [err, setError] = useState('');
  const [title, setTitle] = useState('');
  const [sns, setSNS] = useState();
  const [genre, setGenre] = useState();
  const [list, setList] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSNSChange = (event) => {
    setSNS(event.target.value);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleListChange = (event) => {
    setList(event.target.value);
  };

  const campaignCreate = () => {
    if (!title) {
      toast.error(lang[router.locale].errorName);
      return;
    }

    if (!sns) {
      toast.error(lang[router.locale].errorSNS);
      return;
    }

    if (genre !== 0 && !genre) {
      toast.error(lang[router.locale].errorType);
      return;
    }

    return campaignService
      .createCampaign(title, sns, genre, list)
      .then((ret) => {
        if (ret.status === 'ok') {
          const returnUrl = `/campaign/detail/${ret.id}`;
          router.push(returnUrl);
        } else {
          toast.error(ret.msg);
        }
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };

  return (
    <Fixed userInfo={userInfo}>
      <Container>
        <Box paddingTop={2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            {lang[router.locale].title}
          </Typography>
        </Box>
        <Paper
          sx={{
            width: '60%',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '800px',
            mt: 10,
            mb: 2,
            boxShadow: '0 0px 6px 0 rgb(140 152 164 / 53%)',
            padding: '60px 0px 40px',
          }}
        >
          <Box
            display="block"
            sx={{
              width: '60%',
              margin: '20px auto',
            }}
          >
            <TextField
              label={lang[router.locale].name}
              variant="outlined"
              sx={{
                width: '100%',
              }}
              value={title}
              onChange={handleTitleChange}
            />
          </Box>
          <Box
            display="block"
            sx={{
              width: '60%',
              margin: '20px auto',
            }}
          >
            <TextField
              select
              label="SNS"
              variant="outlined"
              sx={{
                width: '100%',
              }}
              value={sns}
              onChange={handleSNSChange}
            >
              {_.map(Constants.snsTypes, (typeVal, typeKey) => (
                <MenuItem key={typeKey} value={typeKey}>
                  {typeVal}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box
            display="block"
            sx={{
              width: '60%',
              margin: '20px auto',
            }}
          >
            <TextField
              select
              label={Lang[router.locale].caption.type}
              variant="outlined"
              sx={{
                width: '100%',
              }}
              value={genre}
              onChange={handleGenreChange}
            >
              {Constants.campaignTypes[router.locale].map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          {userInfo?.id == '620f41d5fc9e8deb0c16573e' && (
            <Box
              display="block"
              sx={{
                width: '60%',
                margin: '20px auto',
              }}
            >
              <TextField
                select
                label={Lang[router.locale].caption.list}
                variant="outlined"
                sx={{
                  width: '100%',
                }}
                value={list}
                onChange={handleListChange}
              >
                {Constants.campaignLists[router.locale].map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          )}
          <Box sx={{ textAlign: 'center' }}>
            <Button
              className="active"
              variant={'outlined'}
              onClick={(e) => campaignCreate()}
            >
              {Lang[router.locale].btn.create}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Fixed>
  );
};

export default New;
