import { apiHandler } from 'middlewares';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { CampaignRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await changeName();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function changeName() {
    console.log(`/api/campaigns/changename`);

    const { campId, name } = req.body;

    const retVal = await CampaignRepo.changeName(req.user.id, campId, name);
    if (retVal === -1)
      return res.status(200).json({
        status: 'err',
        msg: Lang.communcation_errs.e020,
      });
    if (retVal === -2)
      return res.status(200).json({
        status: 'err',
        msg: 'サーバーにエラーが発生しました',
      });

    return res.status(200).json({
      status: 'ok',
    });
  }
}
