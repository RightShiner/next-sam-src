const md5 = require('md5');
const jwt = require('jsonwebtoken');
import moment from 'moment';
import getConfig from 'next/config';
import dbConnect from 'middlewares/mongodb-handler';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {UserRepo} from 'repositories';
import {withSession} from 'middlewares';


export default withSession(async (req, res) => {
  let isDBConnect = await dbConnect();
  if (!isDBConnect) {
    return res.status(Constants.errors.forbidden).json({ message: Lang.communcation_errs.e005 });
  }

  switch (req.method) {
    case 'POST':
      return await setTermsAgree();
    default:
      return res.status(Constants.errors.badrequest).json({ message: Lang.communcation_errs.e005 });
  }

  async function setTermsAgree() {
    console.log(`/api/users/setagree`);

    const {userId} = req.body;
    await UserRepo.setTermsAgree(userId);
    return res.status(200).json({ status: true });
  }
})