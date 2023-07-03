//import sgMail from '@sendgrid/mail';
//email_api_key: 'astream-sendgrid-api-key2021',
import { apiHandler } from 'middlewares';
import { KeyRepo } from 'repositories';
//import getConfig from 'next/config';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
export default apiHandler(handler);

//const {publicRuntimeConfig} = getConfig();

//sgMail.setApiKey(publicRuntimeConfig.email_api_key);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getRequest();
    case 'POST':
      return await setRequest();
    default:
      return {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function getRequest() {
    console.log(`/api/keyaccount/getRequest`);

    const { type } = req.query;
    let data = await KeyRepo.getRequest(req.user.id, type);

    return res.status(200).json({ status: 'ok', data });
  }

  async function setRequest() {
    console.log(`/api/keyaccount/setRequest`);

    const { data } = req.body;
    await KeyRepo.setRequest(req.user.id, data);

    return res.status(200).json({ status: 'ok' });
  }
}
