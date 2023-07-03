const mongoose = require('mongoose');
import getConfig from 'next/config';
import dbConnect from 'middlewares/mongodb-handler';
import Lang from 'constants/lang';
import Constants, { avg } from 'constants/constants';
import { apiWrapper } from 'helpers';
import moment from 'moment';

const { InstagramId, Instagram } = require('models');
const { serverRuntimeConfig } = getConfig();
const baseUrl = `${serverRuntimeConfig.modashUrl}`;

export default async function handler(req, res) {
  let isDBConnect = await dbConnect();
  if (!isDBConnect) {
    return res
      .status(Constants.errors.forbidden)
      .json({ message: Lang.communcation_errs.e005 });
  }
  switch (req.method) {
    case 'GET':
      return await reportServer();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function reportServer() {
    const { threadId } = req.query;
    delete req.query.threadId;

    const totalThreadCount = 5;
    let newHashtag = [];
    let newMention = [];
    let hashtagGrouped = [];
    let mentionGrouped = [];
    const startTime = Date.now();

    const getFollowersById = async (id) => {
      let ret = await Instagram.findOne({ userId: id }).select('profile');
      return ret?.profile?.followers ?? 0;
    };

    const groupByTag = async (data) => {
      let result = Object.values(
        data.reduce((c, { tag, rate }) => {
          c[tag] = c[tag] || { tag, rate: [] };
          c[tag].rate = c[tag].rate.concat([rate]);
          c[tag].avgRate = avg(c[tag].rate).toFixed(2);
          c[tag].count = c[tag].rate.length;
          return c;
        }, {}),
      );
      return result;
    };

    const fetchPosts = async (url, id) => {
      let after = '';
      let posts = [];

      let followers = await getFollowersById(id);
      let condition = true;
      const splitLines = (str) => str.split(/\r?\n?\s/);
      let pageCount = 0;

      while (condition) {
        let dataFromModash = await apiWrapper
          .get(url, {
            url: id,
            after: after,
          })
          .catch((e) => console.log({ url, id, after, e })); // data fetched using modash api
        let items =
          JSON.parse(JSON.stringify(dataFromModash ?? ''))?.items ?? []; // copy dataFromModash object to avoid error

        items.map((itm) => {
          let likes = itm?.like_count ?? 0;
          let comments = itm?.comment_count ?? 0;
          let engagementRate =
            followers > 0 ? ((likes + comments) / followers) * 100 : 0;
          let splitArray = splitLines(itm?.caption?.text ?? '');
          let hashtag = [];
          let mention = [];
          splitArray.map((el) => {
            if (el.startsWith('#')) {
              if (el.substring(1) !== '') {
                hashtag.push(el.substring(1));
                newHashtag.push({
                  tag: el.substring(1),
                  rate: engagementRate,
                });
              }
            }
            if (el.startsWith('@')) {
              if (el.substring(1) !== '') {
                mention.push(el.substring(1));
                newMention.push({
                  tag: el.substring(1),
                  rate: engagementRate,
                });
              }
            }
          });
          itm.hashtags = hashtag;
          itm.mentions = mention;
        }); // add type, hashtags, mention field to items

        posts.push(...items);

        pageCount++;
        after = dataFromModash?.end_cursor ?? '';
        condition = pageCount < 3 && (dataFromModash?.more_available ?? false);
      }
      return posts;
    };

    const fetchReport = async (url) => {
      let dataFromModash = await apiWrapper.get(url).catch((e) => {
        console.log({ url, e });
      });

      return dataFromModash?.profile ?? {};
    };

    const delay = async (id) => {
      let modashReport = await fetchReport(
        `${baseUrl}/instagram/profile/${id}/report`,
      );

      let feedPost = await fetchPosts(`${baseUrl}/raw/ig/user-feed`, id);
      let reelPost = await fetchPosts(`${baseUrl}/raw/ig/user-reels`, id);
      hashtagGrouped = await groupByTag(newHashtag);
      mentionGrouped = await groupByTag(newMention);
      await Instagram.updateOne(
        {
          userId: id,
        },
        {
          $set: {
            ...modashReport,
            feed: feedPost,
            reel: reelPost,
            newHashtag: hashtagGrouped,
            newMention: mentionGrouped,
            lastUpdated: moment().format('YYYY-MM-DD'),
          },
        },
        {
          new: true,
          upsert: true,
        },
      ).catch((e) => console.log({ e }));
      newHashtag = [];
      newMention = [];
      Promise.resolve();
    };

    let influencers = await InstagramId.find({}).catch((e) =>
      console.log({ e }),
    );
    // console.log(influencers.length); // FIXME
    const clusterLength = Math.ceil(influencers.length / totalThreadCount);
    // console.log(clusterLength); // FIXME

    influencers = influencers.slice(
      +threadId * clusterLength,
      +threadId * clusterLength + clusterLength,
    );
    // console.log(influencers.length);

    for (const [index, influencer] of influencers.entries()) {
      if (index % 100 == 0) {
        console.log(`Thread${threadId}: ${index} of ${influencers.length}`); // TODO
        console.log({ id: influencer.id });
      }
      await delay(influencer.id);
    }

    console.log(`Total: ${(Date.now() - startTime) / 1000} seconds.`);
    res.json(`Total: ${(Date.now() - startTime) / 1000} seconds.`);
  }
}
