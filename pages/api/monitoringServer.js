const mongoose = require('mongoose');
const toObjectId = mongoose.Types.ObjectId;
import getConfig from 'next/config';
import dbConnect from 'middlewares/mongodb-handler';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { apiWrapper } from 'helpers';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

require('events').EventEmitter.defaultMaxListeners = 150;

const { Campaign, Monitoring } = require('models');
const { serverRuntimeConfig } = getConfig();
const baseUrl = `${serverRuntimeConfig.modashUrl}`;

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default async function handler(req, res) {
  const { cp = '' } = req.query;
  const isDBConnect = await dbConnect();
  if (!isDBConnect) {
    return res
      .status(Constants.errors.forbidden)
      .json({ message: Lang.communcation_errs.e005 });
  }
  switch (req.method) {
    case 'GET':
      return await monitorServer(cp);
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function monitorServer(cp) {
    console.log('Start to collect monitoring data');
    const handleError = (err) => console.log(err);

    const modifyContent = async (url, campInfo, from, to, index) => {
      let after = '';
      let contents = [];
      let condition = true;
      const splitLines = (str) => str.split(/\r?\n?\s/);

      console.log({ url, id: campInfo.infId });

      let retry = 0;

      while (condition) {
        console.log({
          url: campInfo.infId,
          after,
        });
        let dataFromModash = await apiWrapper
          .get(
            url,
            after ? { url: campInfo.infId, after } : { url: campInfo.infId },
          )
          .catch(handleError); // data fetched using modash api

        if (dataFromModash === null) {
          console.log({ dataFromModash });
          break;
        }

        if (!dataFromModash) {
          console.log({ dataFromModash });
          retry++;
          await sleep(1000 * retry);

          if (retry > 10) {
            break;
          }

          continue;
        }

        retry = 0;

        let items =
          JSON.parse(JSON.stringify(dataFromModash ?? {})).items ?? []; // copy dataFromModash object to avoid error

        // await Promise.all(
        items?.map((itm) => {
          itm.type = index === 0 ? 'feed' : index === 1 ? 'reel' : 'story';
          if (index !== 2) {
            let splitArray = splitLines(itm.caption?.text ?? '');
            let hashtag = [];
            let mention = [];
            splitArray?.map((el) => {
              if (el.startsWith('#')) hashtag.push(el.substring(1));
              if (el.startsWith('@')) mention.push(el.substring(1));
            });
            itm.hashtags = hashtag;
            itm.mentions = mention;
            itm.tags = itm.usertags
              ? itm?.usertags?.in?.map((val) => {
                  return val.user.username;
                })
              : [];
          }
        });

        after = dataFromModash?.end_cursor ?? '';
        console.log({ new_after: after });
        condition =
          after?.length > 3 && (dataFromModash?.more_available ?? false);

        // stop fetching data if the posts stands out of range
        // the user has set
        if ((items?.length ?? 0) === 0) {
          break;
        }

        contents.push(...items);

        const max = Math.max(...items?.map((itm) => itm.taken_at));

        if (max < from) {
          console.log('The loop was broken due to date limit ---');
          break;
        }
      }

      return contents.filter(
        (itm) => itm.taken_at >= from && itm.taken_at <= to,
      );
    };

    try {
      const startTime = Date.now();
      let results = await Campaign.aggregate([
        {
          $match: {
            _id:
              cp === ''
                ? { $ne: toObjectId('000000000000000000000000') }
                : toObjectId(cp),
            deleted: false,
            'monitoring.isSet': true,
          },
        },
        {
          $unwind: {
            path: '$monitoring.members',
          },
        },
        {
          $sort: { updatedAt: -1 },
        },
        {
          $project: {
            _id: 0,
            campId: '$_id',
            infId: '$monitoring.members',
            monitorFrom: '$monitoring.monitorFrom',
            monitorTo: '$monitoring.monitorTo',
          },
        },
      ]);

      let currPoint = 1;
      const campaignCount = results.length;
      for (let result of results) {
        console.log(
          `------------------ ${currPoint++} / ${campaignCount} ------------------`,
        );
        const from = Date.parse(result.monitorFrom) / 1000;
        const to = 86400 + Date.parse(result.monitorTo) / 1000;

        if (new Date().getTime() / 1000 - to > 2 * 86400) {
          console.log(`Skip campId=${result.campId} infId=${result.infId}`);
          continue;
        }

        const oldData = await Monitoring.findOne({
          campId: toObjectId(result.campId),
          infId: result.infId,
        });

        let oldFeed = (oldData?.contents ?? []).filter(
          (itm) => itm.type == 'feed',
        );
        oldFeed = oldFeed?.reduce(collectNewOnly, []) ?? [];

        const feedFrom = Math.max(
          ...(oldFeed?.map((itm) => itm.taken_at) ?? []),
          from,
        );

        let oldReel = (oldData?.contents ?? []).filter(
          (itm) => itm.type == 'reel',
        );
        oldReel = oldReel?.reduce(collectNewOnly, []) ?? [];

        const reelFrom = Math.max(
          ...(oldReel?.map((itm) => itm.taken_at) ?? []),
          from,
        );

        let oldStories = (oldData?.contents ?? []).filter(
          (itm) => itm.type == 'story',
        );
        oldStories = oldStories?.reduce(collectNewOnly, []) ?? [];

        const storyFrom = Math.max(
          ...(oldStories?.map((itm) => itm.taken_at) ?? []),
          from,
        );

        let feedContent = await modifyContent(
          `${baseUrl}/raw/ig/user-feed`,
          result,
          feedFrom,
          to,
          0,
        );
        feedContent = feedContent?.reduce(collectNewOnly, []) ?? [];

        feedContent =
          feedContent?.reduce((accum, curr) => {
            if (!oldFeed?.map((itm) => itm.pk)?.includes(curr.pk)) {
              if (!accum) {
                return [curr];
              }
              accum.push(curr);
              return accum;
            }
          }, []) ?? [];

        let reelContent = await modifyContent(
          `${baseUrl}/raw/ig/user-reels`,
          result,
          reelFrom,
          to,
          1,
        );
        reelContent = reelContent?.reduce(collectNewOnly, []) ?? [];

        reelContent =
          reelContent?.reduce((accum, curr) => {
            if (!oldReel?.map((itm) => itm.pk)?.includes(curr.pk)) {
              if (!accum) {
                return [curr];
              }
              accum.push(curr);
              return accum;
            }
          }, []) ?? [];

        let storyContent = await modifyContent(
          `${baseUrl}/raw/ig/user-stories`,
          result,
          storyFrom,
          to,
          2,
        );
        storyContent = storyContent?.reduce(collectNewOnly, []) ?? [];

        storyContent =
          storyContent?.reduce((accum, curr) => {
            if (!oldStories?.map((itm) => itm.pk)?.includes(curr.pk)) {
              if (!accum) {
                return [curr];
              }
              accum.push(curr);
              return accum;
            }
          }, []) ?? [];

        await Promise.all([
          ...([
            ...(feedContent ?? []),
            ...(oldFeed ?? []),
            ...(reelContent ?? []),
            ...(oldReel ?? []),
          ]?.map(async (itm) => {
            try {
              if (
                itm.display_url &&
                !itm.display_url?.startsWith('https://astream-stories-image')
              ) {
                const res = await fetch(itm.display_url);
                const blob = await res.buffer();
                const uploadedImage = await s3
                  .upload({
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: `${result.infId}/${itm.pk}_d_${0}.png`,
                    Body: blob,
                  })
                  .promise();
                console.log(uploadedImage.Location);
                itm.display_url = uploadedImage.Location;
              }
            } catch (errorOnFetchDisplayUrl) {
              console.log({ errorOnFetchDisplayUrl });
              console.log(itm);
            }

            try {
              if (
                itm.video_url &&
                !itm.video_url?.startsWith('https://astream-stories-image')
              ) {
                const res = await fetch(itm.video_url);
                const blob = await res.buffer();
                const uploadedImage = await s3
                  .upload({
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: `${result.infId}/${itm.pk}_v_${0}.mp4`,
                    Body: blob,
                  })
                  .promise();
                console.log(uploadedImage.Location);
                itm.video_url = uploadedImage.Location;
              }
            } catch (errorOnFetchVideoUrl) {
              console.log({ errorOnFetchVideoUrl });
              console.log(itm);
            }

            try {
              await Promise.all(
                itm.image_versions2?.candidates?.map(async (candidate, idx) => {
                  try {
                    if (candidate.url) {
                      if (
                        candidate.url.startsWith(
                          'https://astream-stories-image',
                        )
                      )
                        return;

                      const res = await fetch(candidate.url);
                      const blob = await res.buffer();
                      const uploadedImage = await s3
                        .upload({
                          Bucket: process.env.AWS_S3_BUCKET_NAME,
                          Key: `${result.infId}/${itm.pk}_iv_${idx + 1}.png`,
                          Body: blob,
                        })
                        .promise();
                      console.log(uploadedImage.Location);
                      candidate.url = uploadedImage.Location;
                    }
                  } catch (e) {
                    console.log({ e });
                  }
                }) ?? [],
              );
            } catch (errorOnFetchImageVersions2) {
              console.log({ errorOnFetchImageVersions2 });
              console.log(itm);
            }

            if (itm.carousel_media?.length > 0) {
              await Promise.all(
                itm.carousel_media?.map(async (media, idx) => {
                  try {
                    if (media.display_url) {
                      if (
                        media.display_url.startsWith(
                          'https://astream-stories-image',
                        )
                      )
                        return;

                      const res = await fetch(media.display_url);
                      const blob = await res.buffer();
                      const uploadedImage = await s3
                        .upload({
                          Bucket: process.env.AWS_S3_BUCKET_NAME,
                          Key: `${result.infId}/${itm.pk}_cm_${idx + 1}.png`,
                          Body: blob,
                        })
                        .promise();
                      console.log(uploadedImage.Location);
                      media.display_url = uploadedImage.Location;
                    }

                    await Promise.all(
                      media.image_versions2?.candidates?.map(
                        async (candidate, idx2) => {
                          if (candidate.url) {
                            if (
                              candidate.url.startsWith(
                                'https://astream-stories-image',
                              )
                            )
                              return;

                            const res = await fetch(candidate.url);
                            const blob = await res.buffer();
                            const uploadedImage = await s3
                              .upload({
                                Bucket: process.env.AWS_S3_BUCKET_NAME,
                                Key: `${result.infId}/${itm.pk}_cm_iv_${idx +
                                  1}_${idx2}.png`,
                                Body: blob,
                              })
                              .promise();
                            console.log(uploadedImage.Location);
                            candidate.url = uploadedImage.Location;
                          }
                        },
                      ) ?? [],
                    );
                  } catch (errorOnFetchCarouselMedia) {
                    console.log({ errorOnFetchCarouselMedia });
                  }
                }),
              );
            }
          }) ?? []),
          ...(storyContent?.map(async (itm) => {
            if (itm.image_versions2?.candidates?.length > 0) {
              await Promise.all(
                itm.image_versions2?.candidates?.map(async (candidate, idx) => {
                  try {
                    const res = await fetch(candidate.url);
                    const blob = await res.buffer();
                    const uploadedImage = await s3
                      .upload({
                        Bucket: process.env.AWS_S3_BUCKET_NAME,
                        Key: `${result.infId}/${itm.pk}_${idx}.png`,
                        Body: blob,
                      })
                      .promise();
                    console.log(uploadedImage.Location);
                    candidate.url = uploadedImage.Location;
                  } catch (errorOnFetch) {
                    console.log({ errorOnFetch });
                  }
                }),
              );
            }

            if (itm.video_versions?.length > 0) {
              await Promise.all(
                itm.video_versions?.map(async (_itm, idx) => {
                  try {
                    const res = await fetch(_itm.url);
                    const blob = await res.buffer();
                    const uploadedImage = await s3
                      .upload({
                        Bucket: process.env.AWS_S3_BUCKET_NAME,
                        Key: `${result.infId}/${itm.pk}_${_itm.id}_${idx}.mp4`,
                        Body: blob,
                      })
                      .promise();
                    console.log(uploadedImage.Location);
                    _itm.url = uploadedImage.Location;
                  } catch (errorOnFetch) {
                    console.log({ errorOnFetch });
                  }
                }),
              );
            }
          }) ?? []),
        ]);

        await Monitoring.updateOne(
          {
            campId: toObjectId(result.campId),
            infId: result.infId,
          },
          {
            $set: {
              contents: [
                ...(feedContent ?? []),
                ...(oldFeed ?? []),
                ...(reelContent ?? []),
                ...(oldReel ?? []),
                ...(storyContent ?? []),
                ...(oldStories ?? []),
              ],
            },
          },
          {
            new: true,
            upsert: true,
          },
        ).catch(handleError);
      }

      const msg = `success updating database in ${(Date.now() - startTime) /
        1000} seconds.`;

      console.log(msg);
      res.status(200).json(msg);
    } catch (errorFromMonitoring) {
      console.error({ errorFromMonitoring });
    }
  }
}

const collectNewOnly = (accum, curr) => {
  if (!accum?.map((itm) => itm.pk)?.includes(curr.pk)) {
    if (!accum) {
      return [curr];
    }
    accum.push(curr);
    return accum;
  } else {
    return accum;
  }
};
