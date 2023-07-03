import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import dynamic from 'next/dynamic';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import RelativeImage from 'components/RelativeImage';
import { getDataUri, evaluateValue } from 'constants/constants';
import { imageService } from 'services';
import { Base64 } from 'js-base64';
import { useRouter } from 'next/router';

const lang = {
  jp: {
    popularPosts: '人気投稿',
    dateFormat: 'YYYY年M月D日',
  },
  en: {
    popularPosts: 'Popular Posts',
    dateFormat: 'MMM D, YYYY',
  },
};

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const useStyles = makeStyles({
  sponsorposts: {
    marginTop: '2rem',
  },

  ellipseCaption: {
    padding: '.5rem',
    fontSize: '12px',
    display: '-webkit-box',
    overflow: 'hidden',
    lineHeight: 1.4,
    textOverflow: 'ellipsis',
    '-webkitBoxOrient': 'vertical',
    '-webkitLineClamp': 4,
  },
});

const SponsorPostsYoutube = ({ data, open }) => {
  const { locale } = useRouter();
  const classes = useStyles();

  const [thumbs, setThumbs] = useState(
    Array.from(
      { length: !data ? 0 : data.length > 6 ? 6 : data.length },
      (_, i) => {
        return data[i].thumbnail;
      },
    ),
  );

  useEffect(() => {
    if (!open || !data) return;

    async function fetchFromServer() {
      let cnt = Math.min(data.length, 6);
      for (let idx = 0; idx < cnt; idx++) {
        // console.log(`Sponsor${idx} done`);
        let result = null;
        try {
          result = await imageService
            .getImageURL(encodeURIComponent(data[idx].thumbnail))
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

        thumbs[idx] = `data:${result.type};base64,${result.blob}`;
      }
      setThumbs([...thumbs]);
    }

    fetchFromServer();
  }, [data, open]);

  return (
    <Box className={classes.sponsorposts}>
      <Box sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '.5rem' }}>
        <span>{lang[locale].popularPosts}</span>
      </Box>

      <Box className="wrapper-grid" sx={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        {_.map(
          data,
          (itm, idx) =>
            idx < 6 && (
              <Box
                key={idx}
                className="box-wrapper-shadow grid-item nopadding"
                sx={{ maxWidth: '200px' }}
              >
                <Box className="subtitle1 mgl5 mgt5">{`${moment(
                  itm.created,
                ).format(lang[locale].dateFormat)}`}</Box>
                <Box component="a" href={`${itm.url}`} target="_blank">
                  <RelativeImage
                    sx={{ height: '150px !important' }}
                    imgSrc={thumbs[idx]}
                  />
                </Box>
                <Box
                  sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
                  className="mgb5 mgt5"
                >
                  <Box
                    className="mgr5 mgl5"
                    sx={{
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <svg
                      fill="none"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      className="yt-posts-comp_iconSpace_13xIx"
                      style={{ marginRight: '.5rem' }}
                    >
                      <path
                        d="M8.75 1.37l-3.7 3.7c-.24.24-.38.58-.38.94v6.66c0 .73.6 1.33 1.33 1.33h6c.53 0 1.01-.32 1.23-.8l2.17-5.08a2 2 0 00-1.84-2.79H9.79l.64-3.05a1 1 0 00-1.68-.9zM2 14c.73 0 1.33-.6 1.33-1.33V7.33C3.33 6.6 2.73 6 2 6 1.27 6 .67 6.6.67 7.33v5.34C.67 13.4 1.27 14 2 14z"
                        fill="#447D91"
                      ></path>
                    </svg>
                    {itm.likes < 0 ? '-' : evaluateValue(itm.likes)}
                  </Box>
                  <Box
                    className="mgr5 mgl5"
                    sx={{
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <svg
                      fill="none"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      className="yt-posts-comp_iconSpace_13xIx"
                      style={{ marginRight: '.5rem' }}
                    >
                      <path
                        d="M7.25 14.63l3.69-3.7c.25-.24.39-.58.39-.94V3.33c0-.73-.6-1.33-1.34-1.33H4c-.53 0-1.01.32-1.22.8L.61 7.89a2 2 0 001.83 2.79h3.77l-.64 3.05a1 1 0 001.68.9zM14 2c-.73 0-1.33.6-1.33 1.33v5.34c0 .73.6 1.33 1.33 1.33.73 0 1.33-.6 1.33-1.33V3.33C15.33 2.6 14.73 2 14 2z"
                        fill="#ED6664"
                      ></path>
                    </svg>
                    {evaluateValue(0)}
                  </Box>
                </Box>
                <Box
                  sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
                  className="mgb5 mgt5"
                >
                  <Box
                    className="mgr5 mgl5"
                    sx={{
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <svg
                      fill="none"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      className="yt-posts-comp_iconSpace_13xIx"
                      style={{ marginRight: '.5rem' }}
                    >
                      <path
                        d="M8 3A7.88 7.88 0 00.67 8a7.88 7.88 0 0014.66 0c-1.15-2.93-4-5-7.33-5zm0 8.33a3.33 3.33 0 110-6.67 3.33 3.33 0 010 6.67zM8 6a2 2 0 100 4 2 2 0 000-4z"
                        fill="#FA8F38"
                      ></path>
                    </svg>
                    {itm.views < 0 ? '-' : evaluateValue(itm.views)}
                  </Box>
                  <Box
                    className="mgr5 mgl5"
                    sx={{
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <svg
                      fill="none"
                      height="16"
                      viewBox="0 0 16 16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginRight: '.5rem' }}
                    >
                      <path
                        d="M10.8 0H1.2C0.54 0 0 0.54 0 1.2V8.4C0 9.06 0.54 9.6 1.2 9.6H9.6L12 12V1.2C12 0.54 11.46 0 10.8 0ZM9 7.2H3C2.67 7.2 2.4 6.93 2.4 6.6C2.4 6.27 2.67 6 3 6H9C9.33 6 9.6 6.27 9.6 6.6C9.6 6.93 9.33 7.2 9 7.2ZM9 5.4H3C2.67 5.4 2.4 5.13 2.4 4.8C2.4 4.47 2.67 4.2 3 4.2H9C9.33 4.2 9.6 4.47 9.6 4.8C9.6 5.13 9.33 5.4 9 5.4ZM9 3.6H3C2.67 3.6 2.4 3.33 2.4 3C2.4 2.67 2.67 2.4 3 2.4H9C9.33 2.4 9.6 2.67 9.6 3C9.6 3.33 9.33 3.6 9 3.6Z"
                        fill="#4aabed"
                      ></path>
                    </svg>
                    {itm.comments < 0 ? '-' : evaluateValue(itm.comments)}
                  </Box>
                </Box>
                <Box className={classes.ellipseCaption}>{itm.text}</Box>
              </Box>
            ),
        )}
      </Box>
    </Box>
  );
};

export default SponsorPostsYoutube;
