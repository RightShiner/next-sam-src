import { apiHandler } from 'middlewares';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { CampaignRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await createCampaign();
    case 'PUT':
      return await updateCampaign();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function createCampaign() {
    console.log(`/api/campaigns/createcampaign`);

    const { name, sns, type, list } = req.body;

    const campId = await CampaignRepo.createCampaign(
      req.user.id,
      name,
      sns,
      type,
      list,
    );
    if (campId === -1)
      return res.status(200).json({
        status: 'err',
        msg: Lang.communcation_errs.e020,
      });

    return res.status(200).json({
      status: 'ok',
      id: campId,
    });
  }

  async function updateCampaign() {
    console.log(`/api/campaigns/updatecampaign`);

    const { cmpId, name, sns, type, list } = req.body;

    const campId = await CampaignRepo.updateCampaign(
      req.user.id,
      cmpId,
      name,
      sns,
      type,
      list,
    );
    if (campId === -1)
      return res.status(200).json({
        status: 'err',
        msg: Lang.communcation_errs.e020,
      });

    return res.status(200).json({
      status: 'ok',
      id: campId,
    });
  }
}
