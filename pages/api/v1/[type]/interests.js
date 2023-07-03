import {apiHandler} from 'middlewares';

import getConfig from 'next/config';
import {apiWrapper} from 'helpers';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { UserRepo } from 'repositories';
import ReduceCredit from 'constants/reduce_credit';
const {serverRuntimeConfig} = getConfig();
const baseUrl = `${serverRuntimeConfig.modashUrl}`;

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getInterests();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getInterests() {
    const { type } = req.query;
    delete req.query.type;

    console.log(`/api/v1/${type}/interests`);

    let weight;
    switch (type) {
      case "instagram":
        weight = ReduceCredit.instagram.interests;
        break;        
      case "tiktok":
        weight = ReduceCredit.tiktok.interests;
        break;        
      case "youtube":
        weight = ReduceCredit.youtube.interests;
        break;        
    }

    let status = await UserRepo.reduceCredit(req.user.id, weight);   
    if(status){
      return apiWrapper.get(`${baseUrl}/${type}/interests`, req.query
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
