const jwt = require('jsonwebtoken');
import _ from 'lodash';
import { apiHandler } from 'middlewares';

import getConfig from 'next/config';
import { ModashRepo, UsageRepo } from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
const { publicRuntimeConfig } = getConfig();
const isTest = publicRuntimeConfig.testmode;

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await updatefromExternal();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function updatefromExternal() {
    console.log(`/api/modash/update`);

    const { type, userId, curDate, avgViews } = req.body;

    if (!isTest) {
      let usage = await UsageRepo.getCurrentUsage(
        req.user.id,
        curDate,
        'profile',
      );
      if (usage === null || usage === 10) {
        return res.status(200).json({
          status: 'err',
          showalert: true,
          msg: Lang.communcation_errs.e051,
        });
      }
      // else if (usage === -1) {
      //   return res.status(200).json({
      //     status: 'err',
      //     msg: Lang.communcation_errs.e059
      //   });
      // }
    }

    let report = null;
    report = await ModashRepo.downloadReportfromExternal(
      type,
      userId,
      avgViews,
    );
    if (report === null) {
      return res.status(200).json({
        status: 'err',
        msg: 'プロフィールの更新に失敗しました。',
      });
    }

    if (!isTest) {
      let usage = await UsageRepo.updateUsage(req.user.id, curDate, 'profile');
      if (usage === null) {
        return res.status(200).json({
          status: 'err',
          msg: Lang.communcation_errs.e051,
        });
      }
    }

    return res.status(200).json({
      status: 'ok',
      data: report,
    });
  }
}
