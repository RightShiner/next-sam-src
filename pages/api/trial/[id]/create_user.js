import { IncomingWebhook } from '@slack/webhook';
import { withSession } from 'middlewares';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { TrialRepo, UserRepo } from 'repositories';
import dbConnect from 'middlewares/mongodb-handler';
import { GoogleSheetService } from 'libs/google-sheet';
import moment from 'moment';

const sheetId = process.env.TRIAL_GOOGLE_SHEET_ID;
const clientEmail = process.env.TRIAL_GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.TRIAL_GOOGLE_PRIVATE_KEY;
const workspaceId = process.env.TRIAL_GOOGLE_WORKSHEET_ID;

export default withSession(async (req, res) => {
  let isDBConnect = await dbConnect();
  if (!isDBConnect) {
    return res
      .status(Constants.errors.forbidden)
      .json({ message: Lang.communcation_errs.e005 });
  }

  switch (req.method) {
    case 'POST':
      return await createUser();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function createUser() {
    try {
      console.log(`/api/trial/[id]/create_user`);
      console.log(req.query.id, req.body);

      const id = req.query.id;

      console.log(`/api/trial/[id]/create_user: check trialId`);

      const trial = await TrialRepo.findOneByTrialId(id);

      if (!trial) {
        return res.status(200).json({
          status: 'err',
          msg: '無効なトライアルIDです',
        });
      }

      console.log(`/api/trial/[id]/create_user: success trialId`);

      const isAvailable = !trial.disabled && trial.usage < trial.limit;

      if (!isAvailable) {
        return res.status(200).json({
          status: 'err',
          msg: '無効なトライアルIDです',
        });
      }

      console.log(`/api/trial/[id]/create_user: success trial status`);

      const {
        company,
        url,
        name,
        phone,
        email,
        password,
        addr,
        paystart,
        payend,
        sales_person,
      } = req.body;

      console.log(
        company,
        url,
        name,
        phone,
        email,
        password,
        addr,
        paystart,
        payend,
        sales_person,
      );

      const usrId = await UserRepo.createUser(
        company,
        url,
        name,
        phone,
        email,
        password,
        addr,
        paystart,
        payend,
        sales_person,
        id,
      );

      if (usrId === -1)
        return res.status(200).json({
          status: 'err',
          msg: '同じメールアドレスで、既にアカウントが作成されています',
        });

      if (usrId === -2)
        return res.status(200).json({
          status: 'err',
          msg: Lang.communcation_errs.e041,
        });

      if (usrId === -9)
        return res.status(200).json({
          status: 'err',
          msg: Lang.communcation_errs.e049,
        });

      const usage = ++trial.usage;
      console.log(usage, trial._id);
      await TrialRepo.updateTrial(trial._id, { usage });

      // GoogleSpreadSheet
      const sheet = new GoogleSheetService(
        sheetId,
        clientEmail,
        privateKey,
        workspaceId,
      );
      await sheet.init();
      sheet.addRows([
        {
          company,
          url,
          addr,
          name,
          sales_person,
          phone: `'${phone}`,
          email,
          paystart,
          payend,
          date: moment().format('YYYY-MM-DD'),
        },
      ]);

      const slackWebHookUrl = process.env.TRIAL_USER_SLACK_WEBHOOK_URL || '';

      if (slackWebHookUrl) {
        const slackWebhook = new IncomingWebhook(slackWebHookUrl);
        await slackWebhook.send({
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `<!channel>
会社名：${company}
会社URL：${url}
お名前(フルネーム)：${name}
電話番号：${phone}
メールアドレス：${email}
住所：${addr}
------------------------------------------------------------
開始日：${paystart}
終了日：${payend}`,
              },
            },
          ],
        });
      }

      return res.status(200).json({ status: 'ok' });
    } catch (e) {
      console.log(e);
      return res.status(200).json({
        status: 'err',
        msg: e,
      });
    }
  }
});
