import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

const lang = {
  jp: {
    hashtagEngagement: 'ハッシュタグエンゲージメント',
    error:
      '現在、データの表示に問題があります。\r\n数日中に改善されますので、いましばらくお待ちください。',
    popularHashtag: 'よく使うハッシュタグ',
    popularMention: 'よく使うメンション',
    genderSplit: '男女比',
    ethnicity: '民族性',
    language: '使われている言語',
    ageSplit: '年代比',
    maleAgeSplit: '男性の年代比',
    femaleAgeSplit: '女性の年代比',
    locationByCountry: '国',
    locationByCity: '地域',
    audienceInterests: '興味関心',
    audienceBrandAffinity: 'ブランド属性',
  },
  en: {
    hashtagEngagement: 'Hashtag Engagement',
    error:
      'We are currently having trouble displaying the data. \r\nIt will be improved in a few days, so please wait for a while.',
    popularHashtag: '# Popular Hashtags',
    popularMention: '@ Popular Mention',
    genderSplit: 'Gender Split',
    ethnicity: 'Ethnicity',
    language: 'Language',
    ageSplit: 'Age Split',
    maleAgeSplit: 'Male Age Split',
    femaleAgeSplit: 'Female Age Split',
    locationByCountry: 'Location by country',
    locationByCity: 'Location by city',
    audienceInterests: 'Audience Interests',
    audienceBrandAffinity: 'Audience Brand Affinity',
  },
};

const useStyles = makeStyles({
  audiencelikes: {
    marginTop: '2rem',
  },

  fontsize12: {
    fontSize: '12px',
  },

  listitem: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '.25rem',
    paddingBottom: '.25rem',
    fontSize: '.9rem',
  },

  listheader: {
    color: '#757575',
    borderBottom: '.5px solid #bdbdbd',
  },

  griditem: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    paddingTop: '.25rem',
    paddingBottom: '.25rem',
    fontSize: '.9rem',
  },
});

const HashTag = ({
  followers,
  avgs,
  data,
  engage,
  mentions,
  genderlikers,
  genderfollowers,
  enthinity,
  language,
  agesrange,
  ages,
  countries,
  cities,
  brand,
  interest,
}) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });
  const formatterInt = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  });

  return (
    <Box>
      <Box className={classes.audiencelikes}>
        <Box
          sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}
        >
          <span style={{ fontWeight: '600' }}>
            {lang[locale].hashtagEngagement}
          </span>
        </Box>
        <Box className={clsx(classes.listitem, classes.listheader)}>
          <span>Hashtag</span>
          <span>Percent</span>
        </Box>
        {!engage || engage.length === 0 ? (
          <Box
            sx={{ whiteSpace: 'pre-wrap', textAlign: 'center', color: '#888' }}
          >
            {lang[locale].error}
          </Box>
        ) : (
          _.map(
            _.orderBy(engage, ['weight'], ['desc']),
            (itm, idx) =>
              idx < 20 && (
                <Box key={idx} className={classes.listitem}>
                  <span className="subtitle1">#{itm.tag}</span>
                  <span className="subtitle1">{`${formatter.format(
                    itm.weight,
                  )}%`}</span>
                </Box>
              ),
          )
        )}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box
          sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}
        >
          <span style={{ fontWeight: '600' }}>
            {lang[locale].pupularHashtag}
          </span>
        </Box>
        <Box className={clsx(classes.listitem, classes.listheader)}>
          <span>Hashtag</span>
          <span>Percent</span>
        </Box>
        {_.map(
          data,
          (itm, idx) =>
            idx < 20 && (
              <Box key={idx} className={classes.listitem}>
                <span className="subtitle1">#{itm.tag}</span>
                <span className="subtitle1">{`${formatter.format(
                  itm.weight * 100,
                )}%`}</span>
              </Box>
            ),
        )}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box
          sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}
        >
          <span style={{ fontWeight: '600' }}>
            {lang[locale].pupularMention}
          </span>
        </Box>
        <Box className={clsx(classes.listitem, classes.listheader)}>
          <span>Mention</span>
          <span>Percent</span>
        </Box>
        {_.map(
          mentions,
          (itm, idx) =>
            idx < 5 && (
              <Box key={idx} className={classes.listitem}>
                <span className="subtitle1">@{itm.tag}</span>
                <span className="subtitle1">{`${formatter.format(
                  itm.weight * 100,
                )}%`}</span>
              </Box>
            ),
        )}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box
          sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}
        >
          <span style={{ fontWeight: '600' }}>{lang[locale].genderSplit}</span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Gender</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(
          genderlikers,
          (itm, idx) =>
            idx < 5 && (
              <Box key={idx} className={classes.griditem}>
                <span className="subtitle1">{itm.code}</span>
                <span className="subtitle1">{`${formatterInt.format(
                  avgs * itm.weight,
                )}/${formatter.format(itm.weight * 100)}%`}</span>
                <span className="subtitle1">
                  {genderfollowers
                    ? `${formatterInt.format(
                        followers * genderfollowers[idx]?.weight,
                      )}/${formatter.format(
                        genderfollowers[idx]?.weight * 100,
                      )}%`
                    : '-%'}
                </span>
              </Box>
            ),
        )}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box
          sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}
        >
          <span style={{ fontWeight: '600' }}>{lang[locale].ethnicity}</span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Groups</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(
          enthinity,
          (itm, idx) =>
            idx < 5 && (
              <Box key={idx} className={classes.griditem}>
                <span className="subtitle1">{itm.code}</span>
                <span className="subtitle1">{`${formatterInt.format(
                  avgs * itm.likers,
                )}/${formatter.format(itm.likers * 100)}%`}</span>
                <span className="subtitle1">{`${formatterInt.format(
                  followers * itm.followers,
                )}/${formatter.format(itm.followers * 100)}%`}</span>
              </Box>
            ),
        )}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box
          sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}
        >
          <span style={{ fontWeight: '600' }}>{lang[locale].language}</span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Language</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(language, (itm, idx) => (
          <Box key={idx} className={classes.griditem}>
            <span className="subtitle1">{itm.code}</span>
            <span className="subtitle1">{`${formatterInt.format(
              avgs * itm.likers,
            )}/${formatter.format(itm.likers * 100)}%`}</span>
            <span className="subtitle1">{`${formatterInt.format(
              followers * itm.followers,
            )}/${formatter.format(itm.followers * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box
          sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}
        >
          <span style={{ fontWeight: '600' }}>{lang[locale].ageSplit}</span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Age</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(agesrange, (itm, idx) => (
          <Box key={idx} className={classes.griditem}>
            <span className="subtitle1">{itm.code}</span>
            <span className="subtitle1">{`${formatterInt.format(
              avgs * itm.likers,
            )}/${formatter.format(itm.likers * 100)}%`}</span>
            <span className="subtitle1">{`${formatterInt.format(
              followers * itm.followers,
            )}/${formatter.format(itm.followers * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box
          sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}
        >
          <span style={{ fontWeight: '600' }}>{lang[locale].maleAgeSplit}</span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Age</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(ages, (itm, idx) => (
          <Box key={idx} className={classes.griditem}>
            <span className="subtitle1">{itm.code}</span>
            <span className="subtitle1">{`${formatterInt.format(
              avgs * itm.malelikers,
            )}/${formatter.format(itm.malelikers * 100)}%`}</span>
            <span className="subtitle1">{`${formatterInt.format(
              followers * itm.malefollowers,
            )}/${formatter.format(itm.malefollowers * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box
          sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}
        >
          <span style={{ fontWeight: '600' }}>
            {lang[locale].femaleAgeSplit}
          </span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Age</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(ages, (itm, idx) => (
          <Box key={idx} className={classes.griditem}>
            <span className="subtitle1">{itm.code}</span>
            <span className="subtitle1">{`${formatterInt.format(
              avgs * itm.femalelikers,
            )}/${formatter.format(itm.femalelikers * 100)}%`}</span>
            <span className="subtitle1">{`${formatterInt.format(
              followers * itm.femalefollowers,
            )}/${formatter.format(itm.femalefollowers * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box
          sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}
        >
          <span style={{ fontWeight: '600' }}>
            {lang[locale].locationByCountry}
          </span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Country</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(countries, (itm, idx) => (
          <Box key={idx} className={classes.griditem}>
            <span className="subtitle1">{itm.code}</span>
            <span className="subtitle1">{`${formatterInt.format(
              avgs * itm.likers,
            )}/${formatter.format(itm.likers * 100)}%`}</span>
            <span className="subtitle1">{`${formatterInt.format(
              followers * itm.followers,
            )}/${formatter.format(itm.followers * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box
          sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}
        >
          <span style={{ fontWeight: '600' }}>
            {lang[locale].locationByCity}
          </span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>City</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(cities, (itm, idx) => (
          <Box key={idx} className={classes.griditem}>
            <span className="subtitle1">{itm.code}</span>
            <span className="subtitle1">{`${formatterInt.format(
              avgs * itm.likers,
            )}/${formatter.format(itm.likers * 100)}%`}</span>
            <span className="subtitle1">{`${formatterInt.format(
              followers * itm.followers,
            )}/${formatter.format(itm.followers * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box
          sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}
        >
          <span style={{ fontWeight: '600' }}>
            {lang[locale].audienceInterests}
          </span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Interest</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(interest, (itm, idx) => (
          <Box key={idx} className={classes.griditem}>
            <span className="subtitle1">{itm.code}</span>
            <span className="subtitle1">{`${formatterInt.format(
              avgs * itm.likers,
            )}/${formatter.format(itm.likers * 100)}%`}</span>
            <span className="subtitle1">{`${formatterInt.format(
              followers * itm.followers,
            )}/${formatter.format(itm.followers * 100)}%`}</span>
          </Box>
        ))}
      </Box>
      <Box className={classes.audiencelikes}>
        <Box
          sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}
        >
          <span style={{ fontWeight: '600' }}>
            {lang[locale].audienceBrandAffinity}
          </span>
        </Box>
        <Box className={clsx(classes.griditem, classes.listheader)}>
          <span>Brand</span>
          <span>Likers</span>
          <span>Followers</span>
        </Box>
        {_.map(brand, (itm, idx) => (
          <Box key={idx} className={classes.griditem}>
            <span className="subtitle1">{itm.code}</span>
            <span className="subtitle1">{`${formatterInt.format(
              avgs * itm.likers,
            )}/${formatter.format(itm.likers * 100)}%`}</span>
            <span className="subtitle1">{`${formatterInt.format(
              followers * itm.followers,
            )}/${formatter.format(itm.followers * 100)}%`}</span>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HashTag;
