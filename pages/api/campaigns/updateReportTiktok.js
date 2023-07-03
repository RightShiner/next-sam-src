const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {CampaignRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await updateReportTiktok();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function updateReportTiktok() {
    console.log(`/api/campaigns/updateReportTiktok`);

    const {campId, datas} = req.body;
    
    await CampaignRepo.updateMemberTiktok(campId, datas);

    return res.status(200).json({status: 'ok'});
  }
}
