import { apiHandler } from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { UserRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await setPostingMethod();
    case 'GET':
      return await getPostingMethod();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function setPostingMethod() {
    console.log(`/api/users/postingmethod`);

    const { id, data } = req.body;

    await UserRepo.setPostingMethod(id, data);
    return res.status(200).json({ status: 'ok' });
  }

  async function getPostingMethod() {
    console.log(`/api/users/postingmethod`);

    const { id } = req.query;

    let postingMethod = await UserRepo.getPostingMethod(id);
    return res.status(200).json({ status: 'ok', data: postingMethod });
  }
}
