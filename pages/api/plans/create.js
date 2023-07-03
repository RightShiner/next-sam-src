const jwt = require('jsonwebtoken');
import getConfig from 'next/config';
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {PlansRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await createCampaign();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function createCampaign() {
    console.log(`/api/plans/create`);

    const {name, sns, type} = req.body;
    
    const campId = await CampaignRepo.createCampaign(req.user.id, name, sns, type);
    if (campId === -1)
      return res.status(200).json({
        status: 'err',
        msg: Lang.communcation_errs.e020
      });   
  
    return res.status(200).json({
      status: 'ok',
      id: campId
    });
  }
}
