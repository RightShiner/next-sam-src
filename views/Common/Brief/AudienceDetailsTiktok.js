import _ from 'lodash';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import RoundInfo from 'components/RoundInfo';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import { evaluateValue } from 'constants/constants';
import { useRouter } from 'next/router';

const lang = {
  en: {
    followerDataAnalysis: 'Follower data',
    followerDataAnalysisInfo: 'For more information, please see "Full Report".',
    celebrityRate: 'Celebrity rate',
    celebrityRateInfo:
      'This is the rate of accounts with 1000 or more registered users.',
    genderRatio: 'Gender ratio',
    genderRatioInfo: "Male to female ratio of the influencer's followers.",
    male: 'Male',
    female: 'Female',
    country: 'Country',
    countryInfo: 'Which country or city are your followers in? ',
    genderAgeRatio: 'Gender ratio by age',
    genderAgeRatioInfo: 'Gender ratio of followers by age group.',
    language: 'Language',
  },
  jp: {
    followerDataAnalysis: 'フォロワーデータ',
    followerDataAnalysisInfo:
      'もっと詳しく知りたい場合は「フルレポート」をご覧ください。',
    celebrityRate: '有名人率',
    celebrityRateInfo: '登録者数1000人以上のアカウントが登録している率です。',
    genderRatio: '男女比',
    genderRatioInfo: 'フォロワーの男女比率。',
    male: '男',
    female: '女',
    country: '国',
    countryInfo: 'フォロワーがどこの国や都市にいるのか。',
    genderAgeRatio: '年代別男女比',
    genderAgeRatioInfo: 'フォロワーの年代別男女比率。',
    language: '言語',
  },
};

const AudienceDetailsYoutube = ({ data, hashtags }) => {
  const { locale } = useRouter();
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
    <Box className="audiencedetails">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <svg
          fill="none"
          height="11"
          viewBox="0 0 15 11"
          width="15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.25 5.5C6.6975 5.5 7.875 4.26643 7.875 2.75C7.875 1.23357 6.6975 0 5.25 0C3.8025 0 2.625 1.23357 2.625 2.75C2.625 4.26643 3.8025 5.5 5.25 5.5ZM5.25 1.57143C5.8725 1.57143 6.375 2.09786 6.375 2.75C6.375 3.40214 5.8725 3.92857 5.25 3.92857C4.6275 3.92857 4.125 3.40214 4.125 2.75C4.125 2.09786 4.6275 1.57143 5.25 1.57143ZM5.25 6.875C3.495 6.875 0 7.79429 0 9.625V10.2143C0 10.6464 0.3375 11 0.75 11H9.75C10.1625 11 10.5 10.6464 10.5 10.2143V9.625C10.5 7.79429 7.005 6.875 5.25 6.875ZM1.755 9.42857C2.385 8.97286 3.9075 8.44643 5.25 8.44643C6.5925 8.44643 8.115 8.97286 8.745 9.42857H1.755ZM10.53 6.92214C11.4 7.58214 12 8.46214 12 9.625V11H14.25C14.6625 11 15 10.6464 15 10.2143V9.625C15 8.03786 12.375 7.13429 10.53 6.92214ZM9.75 5.5C11.1975 5.5 12.375 4.26643 12.375 2.75C12.375 1.23357 11.1975 0 9.75 0C9.345 0 8.97 0.102143 8.625 0.275C9.0975 0.974286 9.375 1.83071 9.375 2.75C9.375 3.66929 9.0975 4.52571 8.625 5.225C8.97 5.39786 9.345 5.5 9.75 5.5Z"
            fill="#000"
          ></path>
        </svg>
        <span>{lang[locale].followerDataAnalysis}</span>
        <RoundInfo
          sx={{ marginLeft: '.5rem' }}
          caption={lang[locale].followerDataAnalysisInfo}
        />
      </Box>
      <Box className="wrapper-grid" sx={{ gridTemplateColumns: '1fr 1fr' }}>
        <Box>
          <Box
            className="box-wrapper-shadow grid-item"
            sx={{
              marginBottom: '.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <svg
              fill="none"
              height="14"
              viewBox="0 0 22 14"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 6C16.66 6 17.99 4.66 17.99 3C17.99 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 4.66 13.34 6 15 6ZM7 6C8.66 6 9.99 4.66 9.99 3C9.99 1.34 8.66 0 7 0C5.34 0 4 1.34 4 3C4 4.66 5.34 6 7 6ZM7 8C4.67 8 0 9.17 0 11.5V13C0 13.55 0.45 14 1 14H13C13.55 14 14 13.55 14 13V11.5C14 9.17 9.33 8 7 8ZM15 8C14.71 8 14.38 8.02 14.03 8.05C14.05 8.06 14.06 8.08 14.07 8.09C15.21 8.92 16 10.03 16 11.5V13C16 13.35 15.93 13.69 15.82 14H21C21.55 14 22 13.55 22 13V11.5C22 9.17 17.33 8 15 8Z"
                fill="#447D91"
              ></path>
            </svg>
            <Box className="subtitle">{`${formatter.format(
              data.notable * 100,
            )}%`}</Box>
            <span>{lang[locale].celebrityRate}</span>
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].celebrityRateInfo}
            />
          </Box>
          <Box className="box-wrapper-shadow grid-item">
            <Box sx={{ display: 'flex' }}>
              <Box className="subtitle1">{lang[locale].genderRatio}</Box>
              <RoundInfo
                sx={{ marginLeft: '.5rem' }}
                caption={lang[locale].genderRatioInfo}
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
                className="ui-pie-male-bk"
                sx={{ width: '8px', height: '8px', borderRadius: '50%' }}
              ></Box>
              <span style={{ marginLeft: '.5rem' }}>{lang[locale].male}</span>
              <span style={{ marginLeft: 'auto' }}>{`${formatter.format(
                getMaleOrFemale(true) * 100,
              )}%`}</span>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                className="ui-pie-female-bk"
                sx={{ width: '8px', height: '8px', borderRadius: '50%' }}
              ></Box>
              <span style={{ marginLeft: '.5rem' }}>{lang[locale].female}</span>
              <span style={{ marginLeft: 'auto' }}>{`${formatter.format(
                getMaleOrFemale(false) * 100,
              )}%`}</span>
            </Box>
          </Box>
        </Box>
        <Box className="box-wrapper-shadow grid-item">
          <Box sx={{ display: 'flex' }}>
            <Box className="subtitle1">{lang[locale].country}</Box>
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].countryInfo}
            />
          </Box>
          <Box sx={{ marginTop: '30px' }} />
          {_.map(
            data.geoCountries,
            (country, idx) =>
              idx < 3 && (
                <Box key={idx}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span>{country.name}</span>
                    <span>{`${formatter.format(country.weight * 100)}%`}</span>
                  </Box>
                  <Box className="ui-bar-comp">
                    <Box
                      className="ui-bar-progress"
                      sx={{ width: `${country.weight * 100}%` }}
                    ></Box>
                  </Box>
                </Box>
              ),
          )}
          <Box
            sx={{ display: 'flex', marginTop: '30px', marginBottom: '10px' }}
          >
            <Box className="subtitle2">{lang[locale].language}</Box>
          </Box>
          {_.map(
            data.languages,
            (lang, idx) =>
              idx < 3 && (
                <Box key={idx}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span>{lang.name}</span>
                    <span>{`${formatter.format(lang.weight * 100)}%`}</span>
                  </Box>
                  <Box className="ui-bar-comp">
                    <Box
                      className="ui-bar-progress"
                      sx={{ width: `${lang.weight * 100}%` }}
                    ></Box>
                  </Box>
                </Box>
              ),
          )}
        </Box>
      </Box>
      <Box className="wrapper-box box-wrapper-shadow">
        <Box sx={{ display: 'flex' }}>
          <Box className="subtitle1">{lang[locale].genderAgeRatioInfo}</Box>
          <RoundInfo
            sx={{ marginLeft: '.5rem' }}
            caption={lang[locale].genderAgeRatioInfo}
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
            <Box className="bar-chat-item" key={idx}>
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
  );
};

export default AudienceDetailsYoutube;
