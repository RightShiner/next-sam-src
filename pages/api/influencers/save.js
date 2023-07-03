const jwt = require('jsonwebtoken');
import _ from 'lodash';
import { apiHandler } from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { InfluencerRepo, ModashRepo, UsageRepo } from 'repositories';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const isTest = publicRuntimeConfig.testmode;

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await saveInfluencer();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function saveInfluencer() {
    console.log(`/api/influencers/save`);

    const { id, campId, checkStatus, cattype, curDate, avgViews } = req.body;

    if (!isTest) {
      let usage = await UsageRepo.getCurrentUsage(req.user.id, curDate, 'save');
      if (usage === null) {
        return res.status(200).json({
          status: 'err',
          msg: Lang.communcation_errs.e050,
        });
      }
      // else if (usage === -1) {
      //   return res.status(200).json({
      //     status: 'err',
      //     msg: Lang.communcation_errs.e059
      //   });
      // }
    }

    let detailInfo = await ModashRepo.getInfluencerDetail(cattype, id);
    if (detailInfo === null) {
      detailInfo = await ModashRepo.downloadReportfromExternal(
        cattype,
        id,
        avgViews,
      );
    }

    if (detailInfo === null)
      return res.status(200).json({
        status: 'err',
        msg: '保存に失敗しました。',
      });

    const retVal = await InfluencerRepo.saveInfluencer(
      req.user.id,
      id,
      cattype,
      campId,
      checkStatus,
    );
    if (retVal !== false && retVal !== true) {
      return res.status(200).json({
        status: 'err',
        msg: retVal,
      });
    }

    if (!isTest) {
      let usage = await UsageRepo.updateUsage(req.user.id, curDate, 'save');
      if (usage === null) {
        return res.status(200).json({
          status: 'err',
          msg: Lang.communcation_errs.e050,
        });
      }
    }

    return res.status(200).json({ status: 'ok' });
  }
}
