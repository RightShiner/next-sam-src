import {apiHandler} from 'middlewares';
import CampaignRepo from 'repositories/campaign.repo';
import Lang from 'constants/lang';
import Constants from 'constants/constants';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getCampaigns();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getCampaigns() {
    console.log(`/api/campaigns`);

    const userId = req.query.userId;

    let list = await CampaignRepo.getCampaignList(userId);

    return res.status(200).json({status:'ok', list:list});
  }
}
