import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import RoundInfo from 'components/RoundInfo';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

const lang = {
  jp: {
    title: 'コメントしてくれた人のデータ',
    dataError:
      '現在、データの表示に問題があります。\r\n数日中に改善されますので、いましばらくお待ちください。',
    notableCommenters: '有名人率',
    notableCommentersInfo:
      '登録者数1000人以上のアカウントがコメントしている率です。',
    languages: '言語',
    languagesInfo: 'コメントしたユーザーがどの言語を使っているのか。',
    locationByCountry: '国',
    locationByCountryInfo: 'コメントしたユーザーがどこの国にいるのか。',
    genderSplit: '男女比',
    genderSplitInfo: 'コメントしたユーザー男女比',
    male: '男',
    female: '女',
    ageAndGenderSplit: '年代別男女比',
    ageAndGenderSplitInfo: 'コメントしたユーザーの年代別男女比。',
  },
  en: {
    title: 'Audience data by commenters',
    dataError:
      'We are currently having trouble displaying the data. \r\nIt will be improved in a few days, so please wait for a while.',
    notableCommenters: 'Notable commenters',
    notableCommentersInfo:
      'This is the rate at which accounts with 1000 or more registrants are commenting.',
    languages: 'Languages',
    languagesInfo: 'What language is the commenter using?',
    locationByCountry: 'Locaton by country',
    locationByCountryInfo: 'Which country the commenter is from.',
    genderSplit: 'Gender Split',
    genderSplitInfo: 'Male/female ratio of commenters',
    male: 'Male',
    female: 'Female',
    ageAndGenderSplit: 'Age and gender split',
    ageAndGenderSplitInfo: 'Male/female ratio of commenters by age group.',
  },
};

const useStyles = makeStyles({
  audiencelikes: {
    marginTop: '2rem',
  },

  fontsize12: {
    fontSize: '12px',
  },
});

const AudienceCommentersYoutube = ({ data }) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });

  const getMaleOrFemale = (isMale) => {
    if (!data.genders || data.genders.length !== 2) return 0;

    if (data.genders[0].code === 'MALE') {
      if (isMale) return data.genders[0].weight;
      else return data.genders[1].weight;
    } else {
      if (isMale) return data.genders[1].weight;
      else return data.genders[0].weight;
    }
  };

  return (
    <Box className={classes.audiencelikes}>
      <Box sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}>
        <span style={{ fontWeight: '600' }}>{lang[locale].title}</span>
      </Box>

      {!data.credibility && !data.languages ? (
        <Box
          sx={{ whiteSpace: 'pre-wrap', textAlign: 'center', color: '#888' }}
        >
          {lang[locale].dataError}
        </Box>
      ) : (
        <>
          <Box className="wrapper-grid" sx={{ gridTemplateColumns: '1fr 1fr' }}>
            <Box className="grid-item">
              <Box
                className="mgr5"
                component={LazyLoadImage}
                effect="blur"
                src={'/images/svgs/detaillikes.svg'}
                width={'100%'}
                height={'100%'}
              />
            </Box>
            <Box
              className="box-wrapper-shadow grid-item"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                height="16"
                width="18"
                fill="none"
                viewBox="0 0 18 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.2143 15.5319C9.53055 16.1575 8.47795 16.1575 7.79422 15.5229L7.69526 15.4322C2.97207 11.1255 -0.113742 8.30573 0.00321271 4.78783C0.057192 3.24649 0.839891 1.76861 2.1084 0.8982C4.48349 -0.733813 7.41636 0.0277934 8.99975 1.89554C10.5831 0.0277934 13.516 -0.74288 15.8911 0.8982C17.1596 1.76861 17.9423 3.24649 17.9963 4.78783C18.1222 8.30573 15.0274 11.1255 10.3043 15.4503L10.2143 15.5319Z"
                  fill="#e88585"
                ></path>
              </svg>
              <Box
                className="subtitle"
                style={{ fontSize: '30px !import' }}
              >{`${formatter.format(data.notable * 100)}%`}</Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <span>{lang[locale].notableCommenters}</span>
                <RoundInfo
                  sx={{ marginLeft: '.5rem' }}
                  caption={lang[locale].notableCommentersInfo}
                />
              </Box>
            </Box>
          </Box>

          <Box
            className="wrapper-grid"
            sx={{ gridTemplateColumns: '1fr 1fr', marginTop: '.5rem' }}
          >
            <Box className="box-wrapper-shadow grid-item leftalign">
              <Box className="subtitle1" sx={{ display: 'flex' }}>
                {lang[locale].languages}
                <RoundInfo
                  sx={{ marginLeft: '.5rem' }}
                  caption={lang[locale].languagesInfo}
                />
              </Box>
              {_.map(
                data.languages,
                (itm, idx) =>
                  idx < 3 && (
                    <Box key={idx}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>{itm.name}</span>
                        <span>{`${formatter.format(itm.weight * 100)}%`}</span>
                      </Box>
                      <Box className="ui-bar-comp">
                        <Box
                          className="ui-bar-progress"
                          sx={{ width: `${itm.weight * 100}%` }}
                        ></Box>
                      </Box>
                    </Box>
                  ),
              )}
            </Box>
            <Box className="box-wrapper-shadow grid-item leftalign">
              <Box className="subtitle1" sx={{ display: 'flex' }}>
                {lang[locale].locationByCountry}
                <RoundInfo
                  sx={{ marginLeft: '.5rem' }}
                  caption={lang[locale].locationByCountryInfo}
                />
              </Box>
              {_.map(
                data.geoCountries,
                (itm, idx) =>
                  idx < 10 && (
                    <Box key={idx}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>{itm.name}</span>
                        <span>{`${formatter.format(itm.weight * 100)}%`}</span>
                      </Box>
                      <Box className="ui-bar-comp">
                        <Box
                          className="ui-bar-progress"
                          sx={{ width: `${itm.weight * 100}%` }}
                        ></Box>
                      </Box>
                    </Box>
                  ),
              )}
            </Box>
          </Box>

          <Box
            className="wrapper-grid"
            sx={{ gridTemplateColumns: '1fr 2fr', marginTop: '.5rem' }}
          >
            <Box className="box-wrapper-shadow grid-item">
              <Box>
                <Box className="subtitle1" sx={{ display: 'flex' }}>
                  {lang[locale].genderSplit}
                  <RoundInfo
                    sx={{ marginLeft: '.5rem' }}
                    caption={lang[locale].genderSplitInfo}
                  />
                </Box>
                <svg
                  viewBox="0 0 160 160"
                  style={{ width: '90px', height: '90px' }}
                >
                  <g>
                    <circle
                      className="ui-pie-male"
                      cx="80"
                      cy="80"
                      r="60"
                      strokeDasharray="376.99111843077515"
                      transform="rotate(0, 80, 80)"
                      fill="transparent"
                    ></circle>
                  </g>
                  <g>
                    <circle
                      className="ui-pie-female"
                      cx="80"
                      cy="80"
                      r="60"
                      strokeDasharray="376.99111843077515"
                      strokeDashoffset={`${getMaleOrFemale(true) * 365}`}
                      transform="rotate(0, 80, 80)"
                      fill="transparent"
                    ></circle>
                  </g>
                </svg>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#1377EB',
                    }}
                  ></Box>
                  <span style={{ marginLeft: '.5rem' }}>
                    {lang[locale].male}
                  </span>
                  <span style={{ marginLeft: 'auto' }}>{`${formatter.format(
                    getMaleOrFemale(true) * 100,
                  )}%`}</span>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#C48BFF',
                    }}
                  ></Box>
                  <span style={{ marginLeft: '.5rem' }}>
                    {lang[locale].female}
                  </span>
                  <span style={{ marginLeft: 'auto' }}>{`${formatter.format(
                    getMaleOrFemale(false) * 100,
                  )}%`}</span>
                </Box>
              </Box>
            </Box>
            <Box className="box-wrapper-shadow grid-item">
              <Box className="subtitle1" sx={{ display: 'flex' }}>
                {lang[locale].ageAndGenderSplit}
                <RoundInfo
                  sx={{ marginLeft: '.5rem' }}
                  caption={lang[locale].ageAndGenderSplitInfo}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                {_.map(data.gendersPerAge, (itm, idx) => (
                  <Box key={idx} className="bar-chat-item">
                    <Box sx={{ display: 'flex' }}>
                      <Box className="bar-chat-candle">
                        <Box
                          className="bar-candle first"
                          sx={{ height: `${itm.female * 100}%` }}
                        ></Box>
                        <Box className="bar-candle-caption">{`${formatter.format(
                          itm.female * 100,
                        )}%`}</Box>
                      </Box>
                      <Box className="bar-chat-candle">
                        <Box
                          className="bar-candle second"
                          sx={{ height: `${itm.male * 100}%` }}
                        ></Box>
                        <Box className="bar-candle-caption">{`${formatter.format(
                          itm.male * 100,
                        )}%`}</Box>
                      </Box>
                    </Box>
                    <Box>{itm.code}</Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AudienceCommentersYoutube;
