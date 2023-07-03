const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {CampaignRepo, UsageRepo} from 'repositories';

import getConfig from 'next/config';
const {publicRuntimeConfig} = getConfig();
const isTest = publicRuntimeConfig.testmode;

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getCSVData();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getCSVData() {
    console.log(`/api/campaigns/downloadcsv`);

    const {campId, type, curDate} = req.body;

    if (!isTest) {
      let usage = await UsageRepo.getCurrentUsage(req.user.id, curDate, 'csv');
      if (usage === null) {
        return res.status(200).json({
          status: 'err',
          msg: Lang.communcation_errs.e054
        });   
      }
      // else if (usage === -1) {
      //   return res.status(200).json({
      //     status: 'err',
      //     msg: Lang.communcation_errs.e059
      //   });   
      // }
    }
    
    const csvdatas = await CampaignRepo.getCSVData(campId, type);

    if (!isTest) {
      let usage = await UsageRepo.updateUsage(req.user.id, curDate, 'csv', csvdatas ? csvdatas.length : 0);
      if (usage === null) {
        return res.status(200).json({
          status: 'err',
          msg: Lang.communcation_errs.e054
        });   
      }
    }

    return res.status(200).json({
      status: 'ok',
      data: csvdatas
    });
  }
}
