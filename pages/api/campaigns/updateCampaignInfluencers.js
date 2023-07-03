import { apiHandler } from 'middlewares';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { CampaignRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await updateCampaignInfluencers();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function updateCampaignInfluencers() {
    console.log(`/api/campaigns/updateCampaignInfluencers`);

    const { campId, type } = req.body;

    await CampaignRepo.updateCampaignInfluencers(campId, type);

    return res.status(200).json({
      status: 'ok',
    });
  }
}
