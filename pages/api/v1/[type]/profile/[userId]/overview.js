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
      return await getOverview();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getOverview() {
    const { type, userId } = req.query;
    delete req.query.type;
    delete req.query.userId;

    console.log(`/api/v1/${type}/profile/${userId}/overview`);

    let weight;
    switch (type) {
      case "instagram":
        weight = ReduceCredit.instagram.overview;
        break;        
      case "tiktok":
        weight = ReduceCredit.tiktok.overview;
        break;        
      case "youtube":
        weight = ReduceCredit.youtube.overview;
        break;        
    }

    let status = await UserRepo.reduceCredit(req.user.id, weight);   
    if(status){
      return apiWrapper.get(`${baseUrl}/${type}/profile/${userId}/overview`, req.query
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
