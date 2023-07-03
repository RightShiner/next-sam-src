import { apiHandler } from 'middlewares';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { MonitoringRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await postHiddenList();
    default:
      return {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function postHiddenList() {
    console.log(`/api/monitoring/hidden`);

    const campId = req.query.campId;
    const { hiddenList } = req.body;

    await MonitoringRepo.updateMonitoringByHiddenList(campId, hiddenList);
    return res.status(200).json({ status: 'ok' });
  }
}
