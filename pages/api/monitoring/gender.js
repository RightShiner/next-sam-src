import { apiHandler } from 'middlewares';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { MonitoringRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getGenderRateById();
    default:
      return {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function getGenderRateById() {
    console.log(`/api/monitoring/gender`);

    const { data } = req.body;

    let result = await MonitoringRepo.getGenderRateById(data);

    if (result) {
      return res.status(200).json({ status: 'ok', data: result });
    } else {
      return res.status(400).json({ status: 'error' });
    }
  }
}
