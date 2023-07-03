import {apiHandler} from 'middlewares';
import {UsageRepo} from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getHistory();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getHistory() {
    console.log(`/api/plans/gethistory`);

    let result = await UsageRepo.getHistory(req.body);

    return res.status(200).json({status:'ok', data:result});
  }
}
