const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {UpdateRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getlastupdated();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getlastupdated() {
    console.log(`/api/load/lastupdated`);

    const result = await UpdateRepo.getlast();
    if (result == null)
      return res.status(200).json({status: 'ok', data:{updated: '', step: '', downloads: 0, totals: 0, error: '', completed: true}});

    return res.status(200).json({status: 'ok', data:{updated: result.updated, step: result.step, downloads: result.downloads, totals: result.totals, error: result.error, completed: result.completed}});
  }
}
