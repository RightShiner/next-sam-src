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
    case 'POST':
      return await getSearch();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getSearch() {
    const { type } = req.query;
    console.log(`/api/v1/${type}/search`);
    let weight;
    switch (type) {
      case "instagram":
        weight = ReduceCredit.instagram.search;
        break;        
      case "tiktok":
        weight = ReduceCredit.tiktok.search;
        break;        
      case "youtube":
        weight = ReduceCredit.youtube.search;
        break;        
    }

    let status = await UserRepo.reduceCredit(req.user.id, weight);   
    if(status){
      return apiWrapper.get(`${baseUrl}/${type}/search`, req.body
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
