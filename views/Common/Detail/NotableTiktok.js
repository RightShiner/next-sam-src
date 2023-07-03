import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { evaluateValue } from 'constants/constants';
import { imageService } from 'services';
import { useRouter } from 'next/router';

const lang = {
  jp: {
    notableFollowers: 'フォロワーの中の有名人',
  },
  en: {
    notableFollowers: 'Notable Followers',
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
    display: 'grid',
    gridGap: '.5rem',
    gridTemplateColumns: '52fr 10fr 10fr',
    marginTop: '.5rem',
    color: '#757575',
    fontSize: '.9rem',
    borderBottom: '.5px solid #bdbdbd',
    alignItems: 'center',
  },

  itemphoto: {
    display: 'flex',
    alignItems: 'center',
  },
});

const NotableTiktok = ({ followers, setDownloadEnabled, open }) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });

  const [followerPicture, setFollowerPicture] = useState(
    Array.from({ length: !followers ? 0 : followers.length }, (_, i) => {
      return followers[i].picture;
    }),
  );
  useEffect(() => {
    if (!followers || !open) return;

    async function fetchFromServer() {
      let cnt = Math.min(followers.length, 22);
      for (let idx = 0; idx < cnt; idx++) {
        // console.log(idx);
        let result = null;
        try {
          result = await imageService
            .getImageURL(encodeURIComponent(followers[idx].picture))
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
      setDownloadEnabled(true);
    }

    fetchFromServer();
  }, [followers, open]);

  // useEffect(() => {
  //   if (!followers)
  //     return;

  //   _.map(followers, (itm, idx) => {
  //     getDataUri(itm.picture, updateFollowerPictures, idx);
  //   })
  // }, [followers])
  // const updateFollowerPictures = (dataUrl, idx) => {
  //   followerPicture[idx] = dataUrl;
  //   setFollowerPicture([...followerPicture]);
  // }

  return (
    <Box>
      <Box className={classes.audiencelikes}>
        <Box
          sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}
        >
          <svg
            fill="none"
            height="11"
            width="24"
            viewBox="0 0 24 11"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.22.24c-2-.6-4.06-.04-5.39 1.29L12 4.04l-1.52 1.34h.01L7.8 7.77c-.81.81-1.95 1.15-3.12.92A3.354 3.354 0 012.11 6.2 3.39 3.39 0 015.4 2c.91 0 1.76.35 2.44 1.03l.47.41c.38.34.95.34 1.33 0 .45-.4.45-1.1 0-1.5l-.42-.36A5.37 5.37 0 005.4 0C2.42 0 0 2.42 0 5.38s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53L12 6.73l.01.01 1.51-1.36h-.01l2.69-2.39c.81-.81 1.95-1.15 3.12-.92 1.25.25 2.28 1.25 2.57 2.49a3.39 3.39 0 01-3.29 4.2c-.9 0-1.76-.35-2.44-1.03l-.48-.42a.995.995 0 00-1.33 0c-.45.4-.45 1.1 0 1.5l.42.37a5.386 5.386 0 003.82 1.57c3.27 0 5.86-2.9 5.33-6.25-.3-1.99-1.77-3.69-3.7-4.26z"
              fill="#61339C"
            ></path>
          </svg>
          <span style={{ fontWeight: '600', marginLeft: '.5rem' }}>
            {lang[locale].notableFollowers}
          </span>
        </Box>
        <Box className={classes.listitem}>
          <span>Influencers</span>
          <span>Engagements</span>
          <span>Followers</span>
        </Box>
        {_.map(
          followers,
          (itm, idx) =>
            idx < 22 && (
              <Box key={idx} className={classes.listitem}>
                <Box className={classes.itemphoto}>
                  <img
                    src={followerPicture[idx]}
                    className={classes.showFront}
                    style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                    }}
                  />
                  <a
                    href={itm.url}
                    target="_blank"
                    style={{ marginLeft: '1rem' }}
                  >
                    <span>@{itm.username}</span>
                  </a>
                </Box>
                <span className="subtitle1">
                  {evaluateValue(itm.engagements)}
                </span>
                <span className="subtitle1">
                  {evaluateValue(itm.followers)}
                </span>
              </Box>
            ),
        )}
      </Box>
    </Box>
  );
};

export default NotableTiktok;
