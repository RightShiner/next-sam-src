import { display } from '@mui/system';

const mongoose = require('mongoose');
const toObjectId = mongoose.Types.ObjectId;
const { Monitoring, Instagram, Youtube, Tiktok } = require('models');

const MonitoringRepo = {
  getMonitoringById,
  setPosts,
  deletePosts,
  getGenderRateById,
  updateMonitoringByHiddenList,
};

async function getMonitoringById(campId, catType) {
  try {
    let lists = await Monitoring.aggregate([
      {
        $match: {
          campId: toObjectId(campId),
        },
      },
      {
        $lookup: {
          from: catType + 's',
          localField: 'infId',
          foreignField: 'userId',
          as: 'infProfile',
        },
      },
      {
        $unwind: {
          path: '$infProfile',
        },
      },
      {
        $lookup: {
          from: 'campaigns',
          localField: 'campId',
          foreignField: '_id',
          as: 'monitoring',
        },
      },
      {
        $unwind: {
          path: '$monitoring',
        },
      },
      {
        $project: {
          _id: 0,
          'infProfile.userId': 1,
          'infProfile.profile.fullname': 1,
          'infProfile.profile.picture': 1,
          'infProfile.profile.url': 1,
          'infProfile.profile.username': 1,
          'infProfile.profile.followers': 1,
          contents: 1,
          settings: '$monitoring.monitoring',
        },
      },
    ]);

    if (!lists?.length) return null;

    let hashtagFilter = lists[0].settings.hashtag;
    let mentionFilter = lists[0].settings.mention;

    if (catType === 'instagram') {
      lists.map((list) => {
        list.contents = list.contents?.filter((content) => {
          if (content.type === 'story') return true;
          if (content.hidden === true) return false;
          // NOTE: 全件取得は filter せずに返す
          if (list.settings.hasAllTagAndMention) {
            return true;
          }
          let isHashtag = content.hashtags?.filter((el) =>
            hashtagFilter.includes(el),
          );
          let isMention = content.mentions?.filter((el) =>
            mentionFilter.includes(el),
          );
          // let isTag = content.tags?.filter((el) => tagFilter.includes(el));
          let check = isHashtag?.length === 0 && isMention?.length === 0;
          //&& isTag?.length === 0;
          return !check;
        });

        delete list.settings;
      });
    } else {
      lists.map((list) => {
        delete list.settings;
      });
    }
    return lists;
  } catch (error) {
    console.log('error occurred while fetching data from db,', error);
  }

  return campId;
}

async function setPosts(data) {
  const {
    campId,
    member,
    type,
    statistics,
    post_date,
    display_url,
    caption,
    song_used,
  } = data;

  const oldData = await Monitoring.findOne({
    campId: toObjectId(campId),
    infId: member.infId,
  });

  let oldContents = oldData?.contents ?? [];
  console.log('file: monitoring.repo.js ~ line 122 ~ oldContents', oldContents);

  const myIndexOf = (array, target) => {
    for (let val = 0; val < array.length; val++) {
      if (array[val].pk === target) {
        return val;
      }
    }
  };

  let newContent = {
    caption: { text: caption },
    taken_at: Date.parse(post_date) / 1000,
    statistics: statistics,
    method: 'manual',
    member: member,
  };

  switch (type) {
    case 'feed':
      newContent.type = 'feed';
      newContent.carousel_media_count = display_url.length;
      newContent.carousel_media = display_url.map((item) => {
        return { display_url: item.url };
      });
      break;

    case 'reel':
      newContent.type = 'reel';
      newContent.video_url = display_url[0].url;
      break;

    case 'story':
      newContent.type = 'story';
      newContent.image_versions2 = { candidates: [] };
      newContent.image_versions2.candidates = display_url.map((item) => {
        if (item.type === 'image') return { url: item.url };
      });
      newContent.video_versions = display_url.map((item) => {
        if (item.type === 'video') return { url: item.url };
      });
      break;

    case 'tiktok':
      newContent.type = 'tiktok';
      newContent.song_used = song_used;
      newContent.display_url = display_url;
      break;

    case 'movie':
      newContent.type = 'movie';
      newContent.display_url = display_url;
      break;

    default:
      newContent.type = 'short';
      newContent.display_url = display_url;
      break;
  }

  if (!data?.pk) {
    newContent.pk = Date.now();
    try {
      await Monitoring.updateOne(
        {
          campId: toObjectId(campId),
          infId: member.infId,
        },
        {
          $set: {
            contents: [...oldContents, newContent],
          },
        },
        {
          new: true,
          upsert: true,
        },
      );
      return true;
    } catch (error) {
      console.log('Error occurred while saving to db', error);
      return false;
    }
  } else {
    newContent.pk = data.pk;
    let index = myIndexOf(oldContents, data.pk);
    oldContents[index] = { ...oldContents[index], ...newContent };
    try {
      await Monitoring.updateOne(
        {
          campId: toObjectId(campId),
          infId: member.infId,
        },
        {
          $set: {
            contents: oldContents,
          },
        },
      );
      return true;
    } catch (error) {
      console.log('Error occurred while saving to db', error);
      return false;
    }
  }
}

async function deletePosts(data) {
  const { campId, infId, pk } = data;

  const record = await Monitoring.findOne({
    campId: toObjectId(campId),
    infId: infId,
  });
  let contents = record.contents;

  let newContent = contents.filter((content) => {
    return content.pk !== pk;
  });
  console.log('file: monitoring.repo.js ~ line 199 ~ newContent', newContent);

  try {
    await Monitoring.updateOne(
      {
        campId: toObjectId(campId),
        infId: infId,
      },
      {
        $set: {
          contents: newContent,
        },
      },
    );
    return true;
  } catch (error) {
    console.log('Error occurred while saving to db', error);
    return false;
  }
}

async function getGenderRateById(data) {
  const { influencerId, catType } = data;
  try {
    let maleRate = 0;
    let femaleRate = 0;
    for (let i = 0; i < influencerId.length; i++) {
      let ret;
      switch (catType) {
        case 'instagram':
          ret = await Instagram.findOne(
            {
              userId: influencerId[i],
            },
            { _id: 0, audience: 1, profile: 1 },
          );
          break;
        case 'tiktok':
          ret = await Tiktok.findOne(
            {
              userId: influencerId[i],
            },
            { _id: 0, audience: 1, profile: 1 },
          );
          break;
        case 'youtube':
          ret = await Youtube.findOne(
            {
              userId: influencerId[i],
            },
            { _id: 0, audience: 1, profile: 1 },
          );
          break;
        default:
          break;
      }
      maleRate += ret.profile.followers * ret.audience.genders[0].weight;
      femaleRate += ret.profile.followers * ret.audience.genders[1].weight;
    }
    return { maleRate, femaleRate };
  } catch (error) {
    console.log('error is occurred while fetching data', error);
    return false;
  }
}

async function updateMonitoringByHiddenList(campId, hiddenList) {
  try {
    let lists = await Monitoring.aggregate([
      {
        $match: {
          campId: toObjectId(campId),
        },
      },
    ]);

    // NOTE: await したいので for...of
    await Monitoring.bulkWrite(
      lists.map((list) => {
        list.contents.map((content) => {
          const isHidden = hiddenList.includes(content.pk);
          if (isHidden) {
            content.hidden = isHidden;
          }
        });

        const { _id, contents } = list;

        return {
          updateOne: {
            filter: { _id },
            update: { contents },
          },
        };
      }),
    );
  } catch (error) {
    console.log('error occurred while update data from db,', error);
  }
}

export default MonitoringRepo;
