import { apiHandler } from 'middlewares';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { CampaignRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await addNewReportYoutubeMember();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function addNewReportYoutubeMember() {
    console.log(`/api/campaigns/addnewreportyoutube`);

    const { campId, memId } = req.body;

    let newId = await CampaignRepo.addNewReportYoutubeMember(campId, memId);

    return res.status(200).json({ status: 'ok', newId });
  }
}
