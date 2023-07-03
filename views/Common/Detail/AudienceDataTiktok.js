import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import RoundInfo from 'components/RoundInfo';
import { imageService } from 'services';
import { useRouter } from 'next/router';

const lang = {
  jp: {
    title: 'フォロワーデータ',
    titleInfo: 'インフルエンサーをフォローしている人のデータ。',
    notableFollowers: '有名人率',
    notableFollowersInfo:
      'フォロワー数1000人以上のアカウントがフォローしている確率です。',
    languages: '言語',
    languagesInfo: 'インフルエンサーのフォロワーが使っている言語。',
    audienceLookalikes: '類似アカウント',
    audienceLookalikesInfo:
      'キーワードトピックから類似アカウントを表示しています。',
    locationByCountry: '国',
    locationByCountryInfo: 'フォロワーがどこの国にいるのか。',
    genderSplit: '男女比',
    genderSplitInfo: 'フォロワーの男女比率。',
    male: '男',
    female: '女',
    ageAndGenderSplit: '年代別男女比',
    ageAndGenderSplitInfo: 'フォロワーの年代別男女比率。',
  },
  en: {
    title: 'Audience data by followers',
    titleInfo: 'Data of people who follow an influencer.',
    notableFollowers: 'Notable followers',
    notableFollowersInfo:
      'Top followers of this influencer with more than 1,000 followers',
    languages: 'Languages',
    languagesInfo:
      "This indicates the languages the influencer's audience is using",
    audienceLookalikes: 'Audience Lookalikes',
    audienceLookalikesInfo: 'Similar accounts from keywords and topics',
    locationByCountry: 'Location by country',
    locationByCountryInfo:
      "This indicates the countries the influencer's audience is located in.",
    genderSplit: 'Gender Split',
    genderSplitInfo: 'What gender categories does the influencer reach?',
    male: 'Male',
    female: 'Female',
    ageAndGenderSplit: 'Age and gender split',
    ageAndGenderSplitInfo:
      'A breakdown of the age and gender an influencer reaches.',
  },
};

const useStyles = makeStyles({
  audiencedata: {
    marginTop: '2rem',
  },

  fontsize12: {
    fontSize: '12px',
  },
});

const AudienceDataTiktok = ({ data, open }) => {
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

  const [followerPicture, setFollowerPicture] = useState(
    Array.from(
      {
        length:
          !data || !data.audienceLookalikes
            ? 0
            : data.audienceLookalikes.length,
      },
      (_, i) => {
        return data.audienceLookalikes[i].picture;
      },
    ),
  );
  useEffect(() => {
    if (!data || !data.audienceLookalikes || !open) return;

    async function fetchFromServer() {
      let cnt = Math.min(data.audienceLookalikes.length, 3);
      for (let idx = 0; idx < cnt; idx++) {
        let result = null;
        try {
          result = await imageService
            .getImageURL(
              encodeURIComponent(data.audienceLookalikes[idx].picture),
            )
            .then(async (res) => {
              if (!res.ok || res.status !== 200) return null;

              const blob = await res.text();
              return JSON.parse(blob);
            })
            .catch((ex) => {
              console.log(ex.toString());
              return null;
            });
        } catch (ex) {
          console.log(ex.toString());
          continue;
        }

        if (!result) continue;

        followerPicture[idx] = `data:${result.type};base64,${result.blob}`;
      }
      setFollowerPicture([...followerPicture]);
    }

    fetchFromServer();
  }, [data, open]);

  return (
    <Box className={classes.audiencedata}>
      <Box sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}>
        <span style={{ fontWeight: '600' }}>{lang[locale].title}</span>
      </Box>

      <Box className="wrapper-grid" sx={{ gridTemplateColumns: '1fr 1fr' }}>
        <Box className="grid-item">
          <img
            src={'/images/svgs/detailfollowerstiktok.svg'}
            className="mgr5"
            style={{ width: '100%', height: '100%' }}
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
            fill="none"
            height="14"
            viewBox="0 0 22 14"
            width="22"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '36px', height: '22px' }}
          >
            <path
              d="M15 6C16.66 6 17.99 4.66 17.99 3C17.99 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 4.66 13.34 6 15 6ZM7 6C8.66 6 9.99 4.66 9.99 3C9.99 1.34 8.66 0 7 0C5.34 0 4 1.34 4 3C4 4.66 5.34 6 7 6ZM7 8C4.67 8 0 9.17 0 11.5V13C0 13.55 0.45 14 1 14H13C13.55 14 14 13.55 14 13V11.5C14 9.17 9.33 8 7 8ZM15 8C14.71 8 14.38 8.02 14.03 8.05C14.05 8.06 14.06 8.08 14.07 8.09C15.21 8.92 16 10.03 16 11.5V13C16 13.35 15.93 13.69 15.82 14H21C21.55 14 22 13.55 22 13V11.5C22 9.17 17.33 8 15 8Z"
              fill="#447D91"
            ></path>
          </svg>
          <Box
            className="subtitle"
            style={{ fontSize: '30px !import' }}
          >{`${formatter.format(data.notable * 100)}%`}</Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <span>{lang[locale].notableFollowers}</span>
            <RoundInfo
              sx={{ marginLeft: '.5rem' }}
              caption={lang[locale].notableFollowersInfo}
            />
          </Box>
        </Box>
      </Box>

      <Box
        className="wrapper-grid"
        sx={{ gridTemplateColumns: '1fr 1fr', marginTop: '.5rem' }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gridGap: '.5rem' }}
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
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
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
            <Box
              className="subtitle1"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {lang[locale].audienceLookalikes}
              <RoundInfo
                sx={{ marginLeft: '.5rem' }}
                caption={lang[locale].audienceLookalikesInfo}
              />
            </Box>
            {_.map(
              data.audienceLookalikes,
              (itm, idx) =>
                idx < 3 && (
                  <Box
                    key={idx}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '.5rem',
                      marginBottom: '.5rem',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={followerPicture[idx]}
                        className="mgr5"
                        style={{
                          width: '45px',
                          height: '45px',
                          borderRadius: '50%',
                          marginTop: '.5rem',
                        }}
                      />
                      <Box>
                        <Box
                          className={classes.lookname}
                          sx={{ marginLeft: '.5rem' }}
                        >
                          {itm.fullname}
                        </Box>
                        <Box
                          className={classes.lookshortname}
                          component="a"
                          href={itm.url}
                        >
                          @{itm.username}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ),
            )}
          </Box>
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
                      marginTop: '30px',
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
                  backgroundColor: '#1377EB',
                }}
              ></Box>
              <span style={{ marginLeft: '.5rem' }}>{lang[locale].male}</span>
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
                  backgroundColor: '#C48BFF',
                }}
              ></Box>
              <span style={{ marginLeft: '.5rem' }}>{lang[locale].female}</span>
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
    </Box>
  );
};

export default AudienceDataTiktok;
