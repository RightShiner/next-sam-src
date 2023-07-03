import moment from 'moment';
import {apiHandler} from 'middlewares';
import {UserRepo, UsageRepo} from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getHistory();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getHistory() {    
    console.log(`/api/plans/getusage`);

    let {userId} = req.body;

    let temp = await UserRepo.getUserInfo(userId);
    let paystart = temp.paystart ?? '';
    let payend = temp.payend ?? '';

    let usage = {
      pagesplan: 0, pagesuse: 0, profiesplan: 0, profiesuse: 0,
      reportsplan: 0, reportsuse: 0, csvplan: 0, csvuse: 0,
      savesplan: 0, savesuse: 0, monthend: '',
    };
  
    temp = await UsageRepo.getPlanUsage(userId, paystart);
    if (temp) {
        usage = {
          name: temp.name,
          amount: temp.amount, plantype: temp.plantype,
          pagesplan: temp.pagesplan, pagesuse: temp.pagesuse,
          profiesplan: temp.profiesplan, profiesuse: temp.profiesuse,
          reportsplan: temp.reportsplan, reportsuse: temp.reportsuse,
          csvplan: temp.csvplan, csvuse: temp.csvuse,
          savesplan: temp.savesplan??0, savesuse: temp.savesuse??0,
          monthend: temp.monthend??moment().format('YYYY-MM-DD')
        };
    }

    return res.status(200).json({status:'ok', data:usage, startdate: paystart, enddate: payend});
  }
}
