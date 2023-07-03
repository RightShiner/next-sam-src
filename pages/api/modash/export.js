const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import getConfig from 'next/config';
import {apiWrapper} from 'helpers';
import {UsageRepo} from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
const {publicRuntimeConfig, serverRuntimeConfig} = getConfig();
const baseUrl = `${serverRuntimeConfig.modashUrl}`;
const isTest = publicRuntimeConfig.testmode;

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getModashPDFURLs();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getModashPDFURLs() {
    console.log(`/api/modash/export`);

    const {type, userId, curDate} = req.body;

    if (!isTest) {
      const usage = await UsageRepo.getCurrentUsage(req.user.id, curDate, 'csv');
      if (usage === null) {
        return res.status(200).json({
          status: 'err',
          msg: Lang.communcation_errs.e054
        });   
      }
    }

    let msg = null, result = '';
    let downloadUrl = `${baseUrl}/${type}/profile/${userId}/report/pdf`;
    await apiWrapper.postForPDF(downloadUrl)
    .then(response => {
      if (response.error === false)
        result = response.url;
      else
        msg = response.code;
    }).catch(e=>{
      msg = e.code??e.message;
    });  

    if (msg == null) {
      if (!isTest) {
        let usage = await UsageRepo.updateUsage(req.user.id, curDate, 'csv');
        if (usage === null) {
          return res.status(200).json({
            status: 'err',
            msg: Lang.communcation_errs.e054
          });   
        }
      }
      
      return res.status(200).json({
        status: 'ok',
        url: result
      });  
    }

    return res.status(200).json({
      status: 'no',
      msg: msg
    });  
  }
}
