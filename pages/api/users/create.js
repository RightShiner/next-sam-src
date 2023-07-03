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
    console.log(`/api/users/create`);

    const {company, url, name, phone, email, password, addr, paystart, payend} = req.body;
    
    const usrId = await UserRepo.createUser(company, url, name, phone, email, password, addr, paystart, payend);
    if (usrId === -1)
      return res.status(200).json({
        status: 'err',
        msg: Lang.communcation_errs.e040
      });   
    
    if (usrId === -2) 
      return res.status(200).json({
        status: 'err',
        msg: Lang.communcation_errs.e041
      });   

    if (usrId === -9)
      return res.status(200).json({
        status: 'err',
        msg: Lang.communcation_errs.e049
      });   

    return res.status(200).json({
      status: 'ok',
      id: usrId
    });
  }
}
