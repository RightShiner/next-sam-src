const md5 = require('md5');
const jwt = require('jsonwebtoken');
import moment from 'moment';
import getConfig from 'next/config';
import dbConnect from 'middlewares/mongodb-handler';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {UserRepo, UsageRepo} from 'repositories';
import {withSession} from 'middlewares';
import { Base64 } from 'js-base64';

const {serverRuntimeConfig} = getConfig();

export default withSession(async (req, res) => {
  let isDBConnect = await dbConnect();
  if (!isDBConnect) {
    return res.status(Constants.errors.forbidden).json({ message: Lang.communcation_errs.e005 });
  }

  switch (req.method) {
    case 'POST':
      return await checkEmailExists();
    default:
      return res.status(Constants.errors.badrequest).json({ message: Lang.communcation_errs.e005 });
  }

  async function checkEmailExists() {
    console.log(`/api/users/check`);

    const { email } = req.body;
    
    const userInfo = await UserRepo.getUserByEmail(email);
    if (!userInfo)
      return res.status(200).json({ status: false });

    let url = 'reset?param=' + Base64.encode(userInfo.email);
     
    return res.status(200).json({ status: true, name: userInfo.name, url});
  }
})