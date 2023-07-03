const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {CampaignRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await changeCampaignStatus();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function changeCampaignStatus() {
    console.log(`/api/campaigns/switchvisible`);

    const retVal = await CampaignRepo.updateCampaignFlag(req.body);

    return res.status(200).json({status: retVal});
  }
}
