/* eslint-disable react/no-unescaped-entities */
import React, { useCallback } from 'react';
import { Box, Avatar, Typography, Chip } from '@mui/material';
import Link from 'next/link';
import FeedCardBox from './FeedCardBox';
import ReelCardBox from './ReelCardBox';
import StoryCardBox from './StoryCardBox';
import { groupBy } from 'constants/constants';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const GroupByInfluencer = ({
  data,
  settings,
  classes,
  hiddenMode,
  hiddenList,
  setHiddenList,
}) => {
  let groupedData = [];
  let dataGroupedByPerson = groupBy(data, 'username');
  Object.entries(dataGroupedByPerson).map((row) => {
    let person = {};
    person.info = row[1][0].inf_profile;
    let dataGroupedByDate = groupBy(row[1], 'taken_at');
    person.contents = dataGroupedByDate;
    groupedData.push(person);
  });

  const handleHiddenClick = useCallback(
    (pk) => {
      const isInclude = hiddenList.includes(pk);
      if (isInclude) {
        const newHiddenList = hiddenList.filter((item) => item !== pk);
        setHiddenList(newHiddenList);
      } else {
        const newHiddenList = hiddenList.concat([pk]);
        setHiddenList(newHiddenList);
      }
    },
    [hiddenList],
  );

  return (
    <>
      {groupedData?.map((item) => {
        return (
          <>
            <Box mb={5} className={classes.avatar}>
              <Avatar
                alt={item.info.profile.username}
                src={item.info.profile.picture}
                aria-label="recipe"
              />
              <Link variant="body" component={'a'} href={item.info.profile.url}>
                {'@' + item.info.profile.username}
              </Link>
            </Box>
            {Object.entries(item.contents)?.map((row) => {
              let labelCount = row[1].length;
              return (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarMonthIcon
                      fontSize="small"
                      color="primary"
                      sx={{ transform: 'translateY(-2px)' }}
                    />
                    <Typography
                      sx={{
                        fontWeight: '700',
                        fontSize: '.8em',
                        marginRight: 3,
                        display: 'inline-block',
                      }}
                    >
                      {row[0]}
                    </Typography>
                    <Chip
                      label={labelCount}
                      color="info"
                      size="small"
                      sx={{ padding: '7px' }}
                    />
                  </Box>
                  <Box
                    mb={4}
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                    }}
                  >
                    {row[1]?.map((result) => {
                      let isError;
                      let missingTags = {};
                      if (result.type === 'story') {
                        isError = false;
                      } else {
                        let missingHashtag = settings?.hashtag.filter((el) => {
                          return result?.hashtags.indexOf(el) === -1;
                        });
                        let missingMention = settings?.mention.filter((el) => {
                          return result?.mentions.indexOf(el) === -1;
                        });
                        let missingTag = settings?.tag.filter((el) => {
                          return result?.tags.indexOf(el) === -1;
                        });
                        isError =
                          missingHashtag?.length !== 0 ||
                          missingMention?.length !== 0 ||
                          missingTag?.length !== 0;
                        missingTags = {
                          missingHashtag,
                          missingMention,
                          missingTag,
                        };
                      }
                      const components = {
                        feed: FeedCardBox,
                        reel: ReelCardBox,
                        story: StoryCardBox,
                      };
                      const CardBox = components[result.type];
                      return (
                        <>
                          {hiddenMode ? (
                            <Box
                              onClick={() => {
                                handleHiddenClick(result.pk);
                              }}
                              sx={{
                                cursor: 'pointer',
                              }}
                            >
                              <Box
                                sx={{
                                  pointerEvents: 'none',
                                }}
                              >
                                <CardBox
                                  data={result}
                                  date={row[0]}
                                  classes={classes}
                                  isError={isError}
                                  isHiddenSelect={hiddenList.includes(
                                    result.pk,
                                  )}
                                  missingTags={missingTags}
                                  headerData={item.info.profile}
                                />
                              </Box>
                            </Box>
                          ) : (
                            <CardBox
                              data={result}
                              date={row[0]}
                              classes={classes}
                              isError={isError}
                              missingTags={missingTags}
                              headerData={item.info.profile}
                            />
                          )}
                        </>
                      );
                    })}
                  </Box>
                </>
              );
            })}
          </>
        );
      })}
    </>
  );
};

export default GroupByInfluencer;
