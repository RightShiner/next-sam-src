import {apiHandler} from 'middlewares';
import {HistoryRepo, UsageRepo} from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await saveCustomHistory();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function saveCustomHistory() {
    console.log(`/api/plans/savecustomhistory`);

    let result = await HistoryRepo.saveCustomHistory(req.body);

    const {userId, amount, rowId, status} = req.body;
    if (status < 2)
      await UsageRepo.updateCustomAmount(userId, +amount, !rowId);

    return res.status(200).json({status:'ok', data:result});
  }
}
