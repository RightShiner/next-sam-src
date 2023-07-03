import {apiHandler} from 'middlewares';

import getConfig from 'next/config';
import {apiWrapper} from 'helpers';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import ReduceCredit from 'constants/reduce_credit';
import { UserRepo } from 'repositories';
const {serverRuntimeConfig} = getConfig();
const baseUrl = `${serverRuntimeConfig.modashUrl}`;

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getFeed();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getFeed() {
    console.log('/api/v1/raw/ig/user-feed');
    let status = await UserRepo.reduceCredit(req.user.id, ReduceCredit.raw.user_feed);   
    if(status){
      return apiWrapper.get(`${baseUrl}/raw/ig/user-feed`, req.query
      ).then(response => {
        return res.status(200).json(response);  
      }).catch(e=>{
        return res.status(Constants.errors.badrequest).json({ 'message': Lang.communcation_errs.e005 })
      });  
    } else{
      return res.status(Constants.errors.badrequest).json({
        'error': true,
        'message': Lang.communcation_errs.e005
      })
    }  
  }
}
