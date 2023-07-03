import {apiHandler} from 'middlewares';
import getConfig from 'next/config';
const {publicRuntimeConfig} = getConfig();
export default apiHandler(handler);
const stripe = require('stripe')(publicRuntimeConfig.stripePrivateKey);
import Lang from 'constants/lang';
import Constants from 'constants/constants';

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await createStripeSession();
    default:
      return {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function createStripeSession() {
    console.log(`/api/stripe/createsession`);

    const { item, type } = req.body;

    const redirectURL = publicRuntimeConfig.redirectUrl;

    const transformedItem = {
      price_data: {
        currency: 'jpy',
        product_data: {
          name: item.name
        },
        unit_amount: item.price,
      },
      description: item.description,
      quantity: item.quantity,
    };
  
    let session = null;
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [transformedItem],
        mode: 'payment',
        success_url: redirectURL + '?status=success&type=' + type,
        cancel_url: redirectURL + '?status=cancel',
      });
    } catch (ex) {
      console.log(ex);
      return res.status(200).json({
        status: 'no',
      });
    }

    return res.status(200).json({
      status: 'ok',
      id: session.id
    });
  }
}
