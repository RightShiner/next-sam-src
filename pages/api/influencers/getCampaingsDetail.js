const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {InfluencerRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getUsersCampaings();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getUsersCampaings() {
    console.log(`/api/influencers/getCampaingsDetail`);

    const {id} = req.body;
    
    const campLists = await InfluencerRepo.getUsersCampaings(req.user.id, id);
    return res.status(200).json({
      status: 'ok',
      data: campLists
    });
  }
}
