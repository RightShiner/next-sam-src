const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';
import {UsageRepo} from 'repositories';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import getConfig from 'next/config';
const {publicRuntimeConfig} = getConfig();
const isTest = publicRuntimeConfig.testmode;

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getOverview();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getOverview() {
    console.log(`/api/modash/overview`);

    const {curDate} = req.body;

    if (!isTest) {
      // let usage = await UsageRepo.getCurrentUsage(req.user.id, curDate, 'report');
      // if (usage === null) {
      //   return res.status(200).json({
      //     status: 'err',
      //     msg: Lang.communcation_errs.e052
      //   });   
      // }
      // else if (usage === -1) {
      //   return res.status(200).json({
      //     status: 'err',
      //     msg: Lang.communcation_errs.e059
      //   });   
      // }

      let usage = await UsageRepo.updateUsage(req.user.id, curDate, 'report');
      if (usage === null) {
        return res.status(200).json({
          status: 'err',
          msg: Lang.communcation_errs.e052
        });   
      }
    }

    return res.status(200).json({
      status: 'ok',
    });  
  }
}
