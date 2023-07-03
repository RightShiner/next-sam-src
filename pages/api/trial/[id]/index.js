import { apiHandler } from 'middlewares';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { TrialRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'PUT':
      return await updateTrial();
    case 'DELETE':
      return await deleteTrial();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function updateTrial() {
    console.log(`/api/trial/[id]`, 'update');
    await TrialRepo.updateTrial(req.query.id, req.body);

    return res.status(200).json({ status: 'ok' });
  }

  async function deleteTrial() {
    console.log(`/api/trial/[id]`, 'delete');
    await TrialRepo.deleteTrial(req.query.id);

    return res.status(200).json({ status: 'ok' });
  }
}
