import {apiHandler} from 'middlewares';
import {UsageRepo} from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await updatePayStatus();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function updatePayStatus() {
    console.log(`/api/plans/updatepaystatus`);

    await UsageRepo.updatePayStatus(req.body);

    return res.status(200).json({status:'ok'});
  }
}
