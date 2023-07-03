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
    console.log(`/api/influencers/saveall`);

    const { ids, avgViews, campId, checkStatus, cattype, curDate } = req.body;

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

    let errors = 0;

    for (let idx = 0; idx < ids.length; idx++) {
      try {
        let detailInfo = await ModashRepo.getInfluencerDetail(
          cattype,
          ids[idx],
        );
        if (detailInfo === null) {
          detailInfo = await ModashRepo.downloadReportfromExternal(
            cattype,
            ids[idx],
            avgViews[idx],
          );
        }

        if (detailInfo === null) {
          errors++;
          continue;
        }

        const retVal = await InfluencerRepo.saveInfluencer(
          req.user.id,
          ids[idx],
          cattype,
          campId,
          checkStatus,
        );
        if (retVal !== false && retVal !== true) {
          errors++;
        }
      } catch (err) {
        errors++;
      }
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

    return res.status(200).json({ status: 'ok', errors });
  }
}
