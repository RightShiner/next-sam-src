import { apiHandler } from 'middlewares';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { CampaignRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await addNewReportTiktokMember();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function addNewReportTiktokMember() {
    console.log(`/api/campaigns/addnewreporttiktok`);

    const { campId, memId } = req.body;

    let newId = await CampaignRepo.addNewReportTiktokMember(campId, memId);

    return res.status(200).json({ status: 'ok', newId });
  }
}
