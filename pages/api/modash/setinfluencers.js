import _ from 'lodash';
import { apiHandler } from 'middlewares';
import { apiWrapper } from 'helpers';
import getConfig from 'next/config';
import { CampaignRepo, InfluencerRepo, ModashRepo } from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
const { serverRuntimeConfig } = getConfig();
const baseUrl = `${serverRuntimeConfig.modashUrl}`;

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
    console.log(`/api/modash/setinfluencers`);

    try {
      const { type, keys, campId } = req.body;

      let filters = {};

      if (type === Constants.snsInstagram) {
        filters = {
          audience: {
            age: [],
            gender: null,
            interests: [],
            language: null,
            location: [
              process.env.NEXT_PUBLIC_REGION == 'SG' ? 536780 : 382313,
            ],
            credibility: null,
          },
          influencer: {
            accountTypes: [],
            bio: '',
            engagementRate: null,
            followers: {},
            gender: null,
            hasContactDetails: null,
            hasYouTube: false,
            interests: [],
            language: null,
            lastposted: null,
            location: [],
            relevance: [...keys],
            keywords: '',
          },
        };
      } else if (type === Constants.snsYoutube) {
        const influencerNames = [];
        const channelIds = [];

        _.map(keys, (itm) => {
          if (
            itm.length === 25 &&
            (itm.startsWith('@UC') || itm.startsWith('@HC'))
          ) {
            channelIds.push(itm);
          } else {
            influencerNames.push(itm);
          }
        });

        filters = {
          audience: {
            age: [],
            gender: null,
            language: null,
            location: [
              process.env.NEXT_PUBLIC_REGION == 'SG' ? 536780 : 382313,
            ],
          },
          influencer: {
            engagementRate: null,
            followers: {},
            gender: null,
            hasContactDetails: null,
            interests: [],
            language: null,
            location: [],
            relevance: [...influencerNames],
            identifier: [...channelIds],
            views: {},
            keywords: '',
          },
        };
      } else {
        filters = {
          audience: {
            age: [],
            gender: null,
            language: null,
            location: [
              process.env.NEXT_PUBLIC_REGION == 'SG' ? 536780 : 382313,
            ],
          },
          influencer: {
            bio: '',
            engagementRate: null,
            followers: {},
            gender: null,
            hasContactDetails: null,
            language: null,
            location: [],
            relevance: [...keys],
            views: {},
          },
        };
      }

      let members = null,
        ret = false;

      await apiWrapper
        .post(`${baseUrl}/${type}/search`, {
          sort: {},
          page: 1,
          filter: filters,
        })
        .then((response) => {
          if (response.error === false) members = response?.directs ?? [];
          else ret = response.code;
        })
        .catch((e) => {
          ret = e.code ?? e.message;
        });
      if (ret !== false)
        return res.status(200).json({
          status: 'no',
          msg: ret,
        });

      let result = await CampaignRepo.getDetailViaList(campId);
      let isExists = false;

      for (let member of members) {
        isExists = false;

        try {
          isExists =
            result &&
            result.members.filter((itm) => itm.infId === member.userId).length >
              0;
          if (isExists) continue;

          let detailInfo = await ModashRepo.getInfluencerDetail(
            type,
            member.userId,
          );
          if (detailInfo === null) {
            detailInfo = await ModashRepo.downloadReportfromExternal(
              type,
              member.userId,
              member.profile?.averageViews ?? 0,
            );
          }

          if (detailInfo === null) continue;

          await InfluencerRepo.saveInfluencer(
            req.user.id,
            member.userId,
            type,
            campId,
            true,
          );
        } catch (ex) {}
      }

      result = await CampaignRepo.getDetailViaList(campId);

      return res.status(200).json({
        status: 'ok',
        data: result.members,
      });
    } catch (ex) {
      return res.status(200).json({
        status: 'no',
        msg: ex.toString(),
      });
    }
  }
}
