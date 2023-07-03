import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {UserRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await createUser();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function createUser() {
    console.log(`/api/users/changepwd`);

    const {userId, newpwd} = req.body;
    
    const usrId = await UserRepo.changePwd(userId, newpwd);
    return res.status(200).json({
      status: 'ok',
    });
  }
}
