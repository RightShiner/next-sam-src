const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {InfluencerRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getAllCampaignsAmongToUser();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getAllCampaignsAmongToUser() {
    console.log(`/api/influencers/getAllCampaigns`);

    const {catType} = req.body;
    
    const camps = await InfluencerRepo.getAllCampaignsAmongToUser(req.user.id, catType);
    return res.status(200).json({
      status: 'ok',
      data: camps
    });
  }
}
