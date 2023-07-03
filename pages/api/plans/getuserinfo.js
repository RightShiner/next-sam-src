import {apiHandler} from 'middlewares';
import {UserRepo} from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getCustom();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getCustom() {
    console.log(`/api/plans/getuserinfo`);

    let {userId} = req.body;
    let temp = await UserRepo.getUserInfo(userId);
    let userInfo = {
      _id: temp._id.toString(),
      company: temp.company ? temp.company : '',
      url: temp.url ? temp.url : '',
      name: temp.name ? temp.name : '',
      email: temp.email ? temp.email : '',
      addr: temp.addr ? temp.addr : '',
      phone: temp.phone ? temp.phone : '',
      plantype: temp.plantype ? temp.plantype : '',
      periodtype: temp.periodtype ? temp.periodtype : 0,
      paytype: temp.paytype ? temp.paytype : 0,
      paystart: temp.paystart ?? '',
      payend: temp.payend ?? '',
      paystatus: temp.paystatus ?? 2,
      isAgreed: temp.agreed,
    };

    return res.status(200).json({status:'ok', data:userInfo});
  }
}
