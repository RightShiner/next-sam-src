import { apiHandler } from 'middlewares';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { MonitoringRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getMonitoringById();
    default:
      return {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function getMonitoringById() {
    console.log(`/api/monitoring`);

    const { campId, catType } = req.query;

    const list = await MonitoringRepo.getMonitoringById(campId, catType);

    return res.status(200).json({ status: 'ok', list });
  }
}
