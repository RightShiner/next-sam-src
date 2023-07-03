const jwt = require('jsonwebtoken');
import React from 'react';
import {Detail} from 'views/Users';
import getConfig from 'next/config'
import {UserRepo, UsageRepo, HistoryRepo} from 'repositories';
const {serverRuntimeConfig} = getConfig();

const DetailPage = ({userInfo, usage, history}) => {
  return <Detail userInfo={userInfo} usage={usage} history={history} />;
};

export async function getServerSideProps(context) {
  const {id} = context.query;
  let temp = await UserRepo.getUserInfo(id);
  const token = jwt.sign({user: temp._id.toString(), role: temp.perms}, serverRuntimeConfig.secret, { expiresIn: '5d' });
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
    credits: temp.creditNumber,
    token: token,
    isAgreed: temp.agreed
  };

  let usage = {
    pagesplan: 0, pagesuse: 0, profiesplan: 0, profiesuse: 0,
    reportsplan: 0, reportsuse: 0, csvplan: 0, csvuse: 0,
    savesplan: 0, savesuse: 0,
  };

  temp = await UsageRepo.getPlanUsage(userInfo._id, userInfo.paystart);
  if (temp) {
      usage = {
        pagesplan: temp.pagesplan, pagesuse: temp.pagesuse,
        profiesplan: temp.profiesplan, profiesuse: temp.profiesuse,
        reportsplan: temp.reportsplan, reportsuse: temp.reportsuse,
        csvplan: temp.csvplan, csvuse: temp.csvuse,
        savesplan: temp.savesplan??0, savesuse: temp.savesuse??0
      };
  }

  temp = await HistoryRepo.getHistory(userInfo._id);
  let history = temp.map(itm => {
    return {
      _id: itm._id.toString(),
      historydate: itm.historydate??'',
      amount: itm.amount??0,
      periodtype: itm.periodtype??0,
      paytype: itm.paytype??0,
      status: itm.status??0,
      plantype: itm.plantype??'',
      memo: itm.memo ?? '',
    }
  })

  return {props: {userInfo, usage, history}};
}

export default DetailPage;