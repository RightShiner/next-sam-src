import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Typography, Button } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import { CampaignListTable } from './components/Table';
import keywords from 'constants/lang';

const lang = {
  en: {
    title: 'Campaign List',
    createNew: 'Create',
    list: 'List',
    genre: 'Genre',
  },
  jp: {
    title: 'キャンペーンリスト',
    createNew: '新規作成',
    list: 'リスト',
    genre: 'ジャンル',
  },
};

const List = ({ campaigns, user }) => {
  const router = useRouter();
  const [list, setList] = useState(keywords[router.locale].label.all);
  const [sns, setSNS] = useState(keywords[router.locale].label.all);
  const [genre, setGenre] = useState(keywords[router.locale].label.all);

  const handleSelectChanged = (rowId) => {
    router.push({
      pathname: `/campaign/detail/${rowId}`,
    });
  };

  const listList = {
    en: ['Insight', 'Office', 'Scout', 'Suggestion List'],
    jp: ['インサイト', '事務所', 'スカウト', '提案リスト'],
  };
  const snsList = ['Instagram', 'Youtube', 'Tiktok'];
  const genreList = {
    en: [
      'fashion',
      'Beauty',
      'Gourmet',
      'interior',
      'electric appliances',
      'real estate',
      'animal',
      'trip',
      'Daily necessities',
      'Entertainment',
      'Travel/Hotel',
      'game',
      'kids',
      'vehicle',
      'Art (music/film)',
      'business',
      'Sport Active',
      'others',
    ],
    jp: [
      'ファッション',
      'ビューティー',
      'グルメ',
      'インテリア',
      '電化製品',
      '不動産',
      '動物',
      '旅行',
      '日用品',
      'エンタメ',
      '旅行・ホテル',
      'ゲーム',
      'キッズ',
      '乗り物',
      'アート(音楽・映画)',
      'ビジネス',
      'スポーツ・アクティブ',
      'その他',
    ],
  };

  return (
    <Fixed userInfo={user} paidOnly={true}>
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <NextLink href={'/campaign/new'} passHref replace>
              <Button
                component={'a'}
                variant="contained"
                color="primary"
                size="large"
              >
                {lang[router.locale].createNew}
              </Button>
            </NextLink>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {user?.id == '620f41d5fc9e8deb0c16573e' && (
                <>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      marginRight: '1em',
                    }}
                  >
                    {lang[router.locale].list}
                  </Typography>
                  <Select
                    value={list}
                    size="small"
                    sx={{
                      fontSize: '14px',
                      width: '10em',
                      marginRight: '2em',
                    }}
                    onChange={(e) => setList(e.target.value)}
                  >
                    <MenuItem
                      key={keywords[router.locale].label.all}
                      value={keywords[router.locale].label.all}
                      style={{ fontSize: '14px' }}
                    >
                      {keywords[router.locale].label.all}
                    </MenuItem>
                    {_.map(listList[router.locale], (itm) => (
                      <MenuItem
                        key={itm}
                        value={itm}
                        style={{ fontSize: '14px' }}
                      >
                        {itm}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}

              <Typography
                sx={{
                  fontWeight: 500,
                  marginRight: '1em',
                }}
              >
                SNS
              </Typography>
              <Select
                value={sns}
                size="small"
                sx={{
                  fontSize: '14px',
                  width: '10em',
                  marginRight: '2em',
                }}
                onChange={(e) => setSNS(e.target.value)}
              >
                <MenuItem
                  key={keywords[router.locale].label.all}
                  value={keywords[router.locale].label.all}
                  style={{ fontSize: '14px' }}
                >
                  {keywords[router.locale].label.all}
                </MenuItem>
                {_.map(snsList, (itm) => (
                  <MenuItem key={itm} value={itm} style={{ fontSize: '14px' }}>
                    {itm}
                  </MenuItem>
                ))}
              </Select>

              <Typography
                sx={{
                  fontWeight: 500,
                  marginRight: '1em',
                }}
              >
                {lang[router.locale].genre}
              </Typography>
              <Select
                value={genre}
                size="small"
                sx={{
                  fontSize: '14px',
                  width: '15em',
                }}
                onChange={(e) => setGenre(e.target.value)}
              >
                <MenuItem
                  key={keywords[router.locale].label.all}
                  value={keywords[router.locale].label.all}
                  style={{ fontSize: '14px' }}
                >
                  {keywords[router.locale].label.all}
                </MenuItem>
                {_.map(genreList[router.locale], (itm) => (
                  <MenuItem key={itm} value={itm} style={{ fontSize: '14px' }}>
                    {itm}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
          <CampaignListTable
            data={campaigns}
            handleSelectChanged={handleSelectChanged}
            list={list}
            sns={sns}
            genre={genre}
            userInfo={user}
          />
        </Box>
      </Container>
    </Fixed>
  );
};

List.propTypes = {
  campaigns: PropTypes.array,
};

export default List;
