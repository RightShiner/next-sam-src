import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { evaluateValue } from 'constants/constants';
import { imageService } from 'services';
import { useRouter } from 'next/router';

const lang = {
  jp: {
    notableSubscribers: '登録者の中の有名人',
    notableCommenters: 'コメントの中の有名人',
    lookalikes: '類似アカウント',
  },
  en: {
    notableSubscribers: 'Notable subscribers',
    notableCommenters: 'Notable Commenters',
    lookalikes: 'Lookalikes(similar topics)',
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

const NotableYoutube = ({
  followers,
  commenters,
  lookalikes,
  open,
  setDownloadEnabled,
}) => {
  const { locale } = useRouter();
  const classes = useStyles();
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });

  const [followerPicture, setFollowerPicture] = useState(
    Array.from(
      {
        length: !followers ? 0 : followers.length > 22 ? 22 : followers.length,
      },
      (_, i) => {
        return followers[i].picture;
      },
    ),
  );
  const [lookerPicture, setLookerPicture] = useState(
    Array.from(
      {
        length: !lookalikes
          ? 0
          : lookalikes.length > 22
          ? 22
          : lookalikes.length,
      },
      (_, i) => {
        return lookalikes[i].picture;
      },
    ),
  );
  const [likerPicture, setLikerPicture] = useState(
    Array.from(
      {
        length: !commenters
          ? 0
          : commenters.length > 22
          ? 22
          : commenters.length,
      },
      (_, i) => {
        return commenters[i].picture;
      },
    ),
  );

  const [followerDone, setFollowerDone] = useState(false);
  const [lookerDone, setLookerDone] = useState(false);
  const [likerDone, setLikerDone] = useState(false);

  useEffect(() => {
    if (!followerDone || !lookerDone || !likerDone) return;

    setDownloadEnabled(true);
  }, [followerDone, lookerDone, likerDone]);

  useEffect(() => {
    if (!open || !followers) return;
    if (open && followers.length < 1) {
      setFollowerDone(true);
      return;
    }

    async function fetchFromServerFollower() {
      let cnt = Math.min(followers.length, 22);
      for (let idx = 0; idx < cnt; idx++) {
        // console.log(`Follower${idx} done`);
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
      setFollowerDone(true);
    }

    fetchFromServerFollower();
  }, [followers, open]);

  useEffect(() => {
    if (!open || !commenters) return;
    if (open && commenters.length < 1) {
      setLikerDone(true);
      return;
    }

    async function fetchFromServerLiker() {
      let cnt = Math.min(commenters.length, 22);
      for (let idx = 0; idx < cnt; idx++) {
        let result = null;
        try {
          result = await imageService
            .getImageURL(encodeURIComponent(commenters[idx].picture))
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

        likerPicture[idx] = `data:${result.type};base64,${result.blob}`;
      }
      setLikerPicture([...likerPicture]);
      setLikerDone(true);
    }

    fetchFromServerLiker();
  }, [commenters, open]);

  useEffect(() => {
    if (!open || !lookalikes) return;
    if (open && lookalikes.length < 1) {
      setLookerDone(true);
      return;
    }

    async function fetchFromServerLooker() {
      let cnt = Math.min(lookalikes.length, 22);
      for (let idx = 0; idx < cnt; idx++) {
        let result = null;
        try {
          result = await imageService
            .getImageURL(encodeURIComponent(lookalikes[idx].picture))
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

        lookerPicture[idx] = `data:${result.type};base64,${result.blob}`;
      }
      setLookerPicture([...lookerPicture]);
      setLookerDone(true);
    }

    fetchFromServerLooker();
  }, [lookalikes, open]);

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
            {lang[locale].notableSubscribers}
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
                    <span>
                      {itm.username ? '@' + itm.username : itm.fullname}
                    </span>
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
      <Box className={classes.audiencelikes}>
        <Box
          sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}
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
              fill="#000"
            ></path>
          </svg>
          <span style={{ fontWeight: '600', marginLeft: '.5rem' }}>
            {lang[locale].notableCommenters}
          </span>
        </Box>
        <Box className={classes.listitem}>
          <span>Influencers</span>
          <span>Engagements</span>
          <span>Followers</span>
        </Box>
        {_.map(
          commenters,
          (itm, idx) =>
            idx < 22 && (
              <Box key={idx} className={classes.listitem}>
                <Box className={classes.itemphoto}>
                  <img
                    src={likerPicture[idx]}
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
                    <span>
                      {itm.username ? '@' + itm.username : itm.fullname}
                    </span>
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
      <Box className={classes.audiencelikes}>
        <Box
          sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}
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
              fill="#000"
            ></path>
          </svg>
          <span style={{ fontWeight: '600', marginLeft: '.5rem' }}>
            {lang[locale].lookalikes}
          </span>
        </Box>
        <Box className={classes.listitem}>
          <span>Influencers</span>
          <span>Engagements</span>
          <span>Followers</span>
        </Box>
        {_.map(
          lookalikes,
          (itm, idx) =>
            idx < 22 && (
              <Box key={idx} className={classes.listitem}>
                <Box className={classes.itemphoto}>
                  <img
                    src={lookerPicture[idx]}
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
                    <span>
                      {itm.username ? '@' + itm.username : itm.fullname}
                    </span>
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

export default NotableYoutube;
