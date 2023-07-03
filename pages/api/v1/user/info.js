import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { UserRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getInfo();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getInfo() {
    console.log('/api/v1/user/info');
    let user = await UserRepo.getUserInfo(req.user.id)
    if(user !== "error"){
      return res.status(200).json({
        'error': false,
        'user' : {
          'name' : user.name,
          'email' : user.email
        },
        'billing' : {
          'credits' : user.creditNumber
        }
      }); 
    } else {
      return res.status(Constants.errors.badrequest).json({
        'error': true,
        'message': Lang.communcation_errs.e005
      })
    }
  }
}
