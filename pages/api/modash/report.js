const jwt = require('jsonwebtoken');
import _ from 'lodash';
import { apiHandler } from 'middlewares';
import { ModashRepo, UsageRepo } from 'repositories';
import Constants from 'constants/constants';
import Lang from 'constants/lang';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const isTest = publicRuntimeConfig.testmode;

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getReport();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function getReport() {
    console.log(`/api/modash/report`);

    const { type, userId, curDate, avgViews } = req.body;

    let overflow = false;
    let showalert = false;
    if (!isTest) {
      let usage = await UsageRepo.getCurrentUsage(
        req.user.id,
        curDate,
        'profile',
      );
      if (usage === null) {
        overflow = true;
        // return res.status(200).json({
        //   status: 'err',
        //   showalert: true,
        //   msg: Lang.communcation_errs.e051
        // });
      } else if (usage === 10) {
        showalert = true;
        overflow = true;
        // return res.status(200).json({
        //   status: 'err',
        //   showalert: false,
        //   msg: Lang.communcation_errs.e051
        // });
      }
      // else if (usage === -1) {
      //   return res.status(200).json({
      //     status: 'err',
      //     msg: Lang.communcation_errs.e059
      //   });
      // }
    }

    // let detailInfo = await ModashRepo.getInfluencerDetail(type, userId);
    // if (detailInfo === null) {
    let detailInfo = await ModashRepo.downloadReportfromExternal(
      type,
      userId,
      avgViews,
    );
    // }

    if (detailInfo === null) {
      return res.status(200).json({
        status: 'no',
        data: 'プロフィールを取得できません。',
      });
    }

    // if (
    //   type === Constants.snsInstagram &&
    //   (!detailInfo.hashtagengage || detailInfo.hashtagengage.length < 1)
    // ) {
    //   let hashtagengage = [];
    //   _.map(detailInfo.popularPosts, (itm) => {
    //     let likes = itm.likes ?? 0;
    //     let comments = itm.comments ?? 0;
    //     let followers = detailInfo.profile.followers ?? 0;

    //     let weight = followers > 0 ? ((likes + comments) / followers) * 100 : 0;
    //     _.map(itm.hashtags, (tag) => {
    //       let isExists = _.findIndex(
    //         hashtagengage,
    //         (engage) => engage.tag === tag,
    //       );
    //       if (weight < 0.01) return;

    //       if (isExists === -1) {
    //         hashtagengage.push({ tag: tag, weight: weight });
    //       } else {
    //         if (weight < hashtagengage[isExists].weight) return;

    //         hashtagengage[isExists].weight = weight;
    //       }
    //     });
    //   });

    //   detailInfo.hashtagengage = hashtagengage;
    //   await ModashRepo.updateInstagram(detailInfo.userId, hashtagengage);
    // } else if (type === Constants.snsTiktok || type === Constants.snsYoutube) {
    //   let comments = 0,
    //     likes = 0,
    //     engage = 0;
    //   _.map(detailInfo.recentPosts, (itm) => {
    //     if (itm.comments) comments += itm.comments;
    //     if (itm.likes) likes += itm.likes;

    //     if (itm.likes && itm.comments) engage += itm.likes + itm.comments;
    //   });

    //   if (detailInfo.recentPosts && detailInfo.recentPosts.length > 0) {
    //     let counts = detailInfo.recentPosts.length;
    //     detailInfo.avgViews = avgViews;
    //     detailInfo.avgComments = comments / counts;
    //     detailInfo.avgLikes = likes / counts;
    //     if (avgViews > 0)
    //       detailInfo.avgEngagements = engage / counts / avgViews;
    //     else detailInfo.avgEngagements = 0;

    //     if (type === Constants.snsYoutube)
    //       await ModashRepo.updateYoutubeAvgs(
    //         detailInfo.userId,
    //         detailInfo.avgViews,
    //         detailInfo.avgLikes,
    //         detailInfo.avgComments,
    //         detailInfo.avgEngagements,
    //       );
    //     else
    //       await ModashRepo.updateTiktokAvgs(
    //         detailInfo.userId,
    //         detailInfo.avgViews,
    //         detailInfo.avgLikes,
    //         detailInfo.avgComments,
    //         detailInfo.avgEngagements,
    //       );
    //   }
    // }

    if (!isTest && !overflow) {
      let usage = await UsageRepo.updateUsage(req.user.id, curDate, 'profile');
      if (usage === null) {
        return res.status(200).json({
          status: 'err',
          msg: Lang.communcation_errs.e051,
        });
      }
    }

    let isFullReport = true;
    if (!isTest)
      isFullReport = await UsageRepo.getCurrentUsage(
        req.user.id,
        curDate,
        'report',
      );

    return res.status(200).json({
      status: 'ok',
      data: detailInfo,
      report: isFullReport == true ? true : false,
      showalert: showalert,
      overflow: overflow,
    });
  }
}
