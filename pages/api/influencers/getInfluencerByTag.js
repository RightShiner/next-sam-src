import { apiHandler } from 'middlewares';
import moment from 'moment';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { UsageRepo, InfluencerRepo } from 'repositories';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const isTest = publicRuntimeConfig.testmode;

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getInfluencerByTag();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function getInfluencerByTag() {
    console.log(`/api/influencers/getInfluencerByTag`);
    console.log(req.body.filters.influencer.hashtagEngagement);

    const { isReload } = req.body;
    const curDate = moment().format('YYYY-MM-DD');

    if (!isReload && !isTest) {
      let usage = await UsageRepo.getCurrentUsage(
        req.user.id,
        curDate,
        'search',
      );
      if (usage === null) {
        return res.status(200).json({
          status: 'err',
          msg: Lang.communcation_errs.e053,
        });
      }
    }

    let members = await InfluencerRepo.getInfluencerByTag(req.body);

    if (!isReload && !isTest) {
      UsageRepo.updateUsage(req.user.id, curDate, 'search');
    }

    return res.status(200).json({
      status: 'ok',
      data: {
        total: members.total,
        data: members.lookalikes,
        directs: members.directs,
      },
    });
  }
}
