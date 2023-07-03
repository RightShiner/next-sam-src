import _ from 'lodash';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { Base64 } from 'js-base64';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '600mb',
    },
    responseLimit: false,
  },
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default handler;

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await downloadImage(req.query.url);
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function downloadImage(originUrl) {
    let url = originUrl;
    try {
      if (!url || url === 'undefined') {
        console.log({ url });
        return res.send(null);
      }

      let blob;
      while (true) {
        blob = await fetch(url)
          .then(async (r) => await r.blob())
          .catch((e) => {
            console.log({ e, url });
            if (
              e.toString() == 'TypeError: Only absolute URLs are supported' &&
              url.startsWith('https')
            ) {
              url = decodeURIComponent(url);
            }
          });

        if (blob) {
          break;
        }

        console.log({ 'Retrying to downloadImage': url });

        await sleep(50);
      }
      let type = blob.type;
      let size = blob.size;
      //var urlData = createObjectURL(blob);
      blob = await blob.arrayBuffer();
      blob = Base64.encode(blob);
      return res.send({ type, size, blob });
    } catch (ex) {
      console.log(ex.toString());
      if (ex.toString().indexOf('0x1fffffe8') > 0) {
        return res.send({ type: '', size: 0, blob: null });
      }
      return res.send(null);
    }
  }
}
