import {apiHandler} from 'middlewares';
import {UsageRepo} from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await switchPlan();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function switchPlan() {
    console.log(`/api/plans/switchplan`);

    let result = await UsageRepo.switchPlan(req.body);

    if (result === true)
      return res.status(200).json({status:'ok'});
      
    return res.status(200).json({status:'err'});
  }
}
