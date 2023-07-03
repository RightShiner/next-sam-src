import {apiHandler} from 'middlewares';
import {PlansRepo} from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await updatePlans();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function updatePlans() {
    console.log(`/api/plans/update`);

    const {enterprise, advanced, performance, essentials, trial} = req.body;
    
    await PlansRepo.updatePlans(enterprise, advanced, performance, essentials, trial);

    return res.status(200).json({status:'ok'});
  }
}
