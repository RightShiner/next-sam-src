const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import getConfig from 'next/config';
import {apiWrapper} from 'helpers';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
const {serverRuntimeConfig} = getConfig();
const baseUrl = `${serverRuntimeConfig.modashUrl}`;

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getLanguages();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getLanguages() {
    console.log(`/api/modash/languages`);

    const {type} = req.body;

    return apiWrapper.get(`${baseUrl}/${type}/languages`
    ).then(response => {
      return res.status(200).json({
        status: 'ok',
        data: response
      });  
    }).catch(e=>{
      console.log(e);
    });  
  }
}
