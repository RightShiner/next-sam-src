const jwt = require('jsonwebtoken');
import { apiHandler } from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { CampaignRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getMonitoring();
    case 'POST':
      return await setMonitoring();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function getMonitoring() {
    console.log(`/api/campaigns/getmonitoring`);

    const { campId } = req.query;
    let result = await CampaignRepo.getMonitoring(campId);

    if (result) {
      return res.status(200).json({ status: 'ok', data: result });
    } else {
      return res.status(400).json({ status: 'error' });
    }
  }

  async function setMonitoring() {
    console.log(`/api/campaigns/setmonitoring`);

    const { campId, data } = req.body;

    let result = await CampaignRepo.setMonitoring(campId, data);

    if (result) {
      return res.status(200).json({ status: 'ok', data: campId });
    } else {
      return res.status(400).json({ status: 'error' });
    }
  }
}
