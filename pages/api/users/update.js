import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {UserRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await updateUser();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function updateUser() {
    console.log(`/api/users/update`);

    await UserRepo.updateUser(req.user.id, req.body);
    return res.status(200).json({status: 'ok'});
  }
}
