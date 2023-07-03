import _ from 'lodash';
import { apiHandler } from 'middlewares';
import { apiWrapper } from 'helpers';
import getConfig from 'next/config';
import { CampaignRepo, UsageRepo, InfluencerRepo } from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
const baseUrl = `${serverRuntimeConfig.modashUrl}`;
const isTest = publicRuntimeConfig.testmode;

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getSearch();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function getSearch() {
    console.log(`/api/modash/search`);

    try {
      const { type, sort, page, filters, curDate, isReload } = req.body;

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

      !(filters?.audience?.location?.length > 0) &&
        (filters.audience.location = [
          process.env.NEXT_PUBLIC_REGION == 'SG' ? 536780 : 382313,
        ]);

      let members = null,
        ret = false;
      try {
        await apiWrapper
          .post(`${baseUrl}/${type}/search`, {
            sort: sort,
            page: page,
            filter: filters,
          })
          .then((response) => {
            if (!response.error) {
              members = response;
            } else {
              ret = response.code;
            }
          })
          .catch((e) => {
            ret = e.code ?? e.message;
          });

        if (ret !== false) {
          return res.status(200).json({
            status: 'no',
            msg: ret,
          });
        }

        await Promise.all([
          ...(members.lookalikes.map(async (itm) => {
            itm.campaigns = await CampaignRepo.getAmongCampaignsUsingInfid(
              itm.userId,
            );
          }) ?? []),
          ...(members.directs.map(async (itm) => {
            itm.campaigns = await CampaignRepo.getAmongCampaignsUsingInfid(
              itm.userId,
            );
          }) ?? []),
          ...(members.lookalikes.map(async (itm) => {
            itm.tags = await InfluencerRepo.getInfluencerTags(
              req.user.id,
              itm.userId,
            );
          }) ?? []),
          ...(members.directs.map(async (itm) => {
            itm.tags = await InfluencerRepo.getInfluencerTags(
              req.user.id,
              itm.userId,
            );
          }) ?? []),
        ]);

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
      } catch (ex) {
        return res.status(200).json({
          status: 'no',
          msg: ex.toString(),
        });
      }
    } catch (ex) {
      return res.status(200).json({
        status: 'ok',
        data: { total: 0, data: [], directs: [] },
      });
    }
  }
}
