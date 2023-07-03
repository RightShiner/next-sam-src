import _ from 'lodash';
import { apiHandler } from 'middlewares';
import { TrialRepo } from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import md5 from 'md5';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await findAll();
    case 'POST':
      return await createTrial();
    default:
      return {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function findAll() {
    console.log(`/api/trial`, 'findAll');
    const list = await TrialRepo.findAll();
    return res.status(200).json({ status: 'ok', trials: list });
  }

  async function createTrial() {
    console.log(`/api/trial`, 'createTrial');
    const body = req.body || {};
    const payload = {
      trialId: md5(`${Date.now()}_trial`),
      limit: 1,
      usage: 0,
      disabled: false,
      ...body,
    };
    await TrialRepo.createTrial(payload);
    return res.status(200).json({ status: 'ok' });
  }
}
