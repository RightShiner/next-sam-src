const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {CampaignRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await updateMemberAmount();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function updateMemberAmount() {
    console.log(`/api/campaigns/udpatememberamount`);

    await CampaignRepo.updateMemberAmount(req.body);

    return res.status(200).json({status: 'ok'});
  }
}
