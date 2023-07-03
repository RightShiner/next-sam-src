const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {InfluencerRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await updateInfluencer();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function updateInfluencer() {
    console.log(`/api/influencers/update`);

    const {id, star, memo} = req.body;
    
    await InfluencerRepo.updateInfluencer(req.user.id, id, star, memo);
    return res.status(200).json({status: 'ok'});
  }
}
