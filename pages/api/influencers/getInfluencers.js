const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {InfluencerRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getInfluencers();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getInfluencers() {
    console.log(`/api/influencers/getInfluencers`);

    const camps = await InfluencerRepo.getInfluencers(req.body);
    return res.status(200).json({
      status: 'ok',
      data: camps
    });
  }
}
