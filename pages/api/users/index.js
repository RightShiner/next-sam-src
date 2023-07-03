import _ from 'lodash';
import {apiHandler} from 'middlewares';
import {UserRepo} from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getAllUsers();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getAllUsers() {
    console.log(`/api/users`);

    let list = await UserRepo.getAllUsers();
    list = _.filter(list, itm => itm.perms !== Constants.roleInfo.admin);

    return res.status(200).json({status:'ok', users:list});
  }
}
