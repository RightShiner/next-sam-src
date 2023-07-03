import { apiHandler } from 'middlewares';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { CampaignRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await addNewReportMember();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function addNewReportMember() {
    const { campId, memId, rtype } = req.body;

    console.log(`/api/campaigns/addnewreport`);

    let newId = await CampaignRepo.addNewReportMember(campId, memId, rtype);

    return res.status(200).json({ status: 'ok', newId });
  }
}
