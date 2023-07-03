const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {InfluencerRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getTagsByAccountId();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getTagsByAccountId() {
    console.log(`/api/influencers/getinfluencertags`);

    const {accountId} = req.body;
    
    const camps = await InfluencerRepo.getTagsByAccountId(req.user.id, accountId);
    return res.status(200).json({
      status: 'ok',
      data: camps
    });
  }
}
