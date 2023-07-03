import { apiHandler } from 'middlewares';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { CampaignRepo, MonitoringRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await postHiddenList();
    default:
      return {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function postHiddenList() {
    console.log(`/api/campaigns/hidden`);

    const { campId, hiddenList } = req.body;
    await CampaignRepo.updateHiddenList(campId, hiddenList);

    return res.status(200).json({ status: 'ok' });
  }
}
