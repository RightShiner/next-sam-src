import { apiHandler } from 'middlewares';
import { TrialRepo } from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await findAllTrialUsers();
    default:
      return {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function findAllTrialUsers() {
    console.log(`/api/trial/users`, 'findAllTrialUsers');
    const list = await TrialRepo.findAllTrialUsers();
    return res.status(200).json({ status: 'ok', trialUsers: list });
  }
}
