import {apiHandler} from 'middlewares';
import {HistoryRepo, UsageRepo} from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await removeCustomHistory();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function removeCustomHistory() {
    console.log(`/api/plans/removecustomhistory`);

    let result = await HistoryRepo.removeCustomHistory(req.body);
    return res.status(200).json({status:'ok'});
  }
}
