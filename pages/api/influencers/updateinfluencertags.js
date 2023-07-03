const jwt = require('jsonwebtoken');
import _  from 'lodash';
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {InfluencerRepo, ModashRepo, UsageRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await updateInfluencerTags();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function updateInfluencerTags() {
    console.log(`/api/influencers/updateinfluencertags`);

    const {accountId, tagId, checkStatus} = req.body;

    const retVal = await InfluencerRepo.updateInfluencerTags(accountId, tagId, checkStatus);
    if (retVal === false)
      return res.status(200).json({
        status: 'err',
        msg: '処理しながらエラーが発生しました。'
      });   

    return res.status(200).json({status: 'ok'});
  }
}
