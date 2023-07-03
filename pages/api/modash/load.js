import { apiHandler } from 'middlewares';
import getConfig from 'next/config';
import { apiWrapper } from 'helpers';
import { CampaignRepo, InfluencerRepo } from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
const { serverRuntimeConfig } = getConfig();
const baseUrl = `${serverRuntimeConfig.modashUrl}`;

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getInfluencersPerPage();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function getInfluencersPerPage() {
    console.log(`/api/modash/load`);

    const { type, sort, page } = req.body;

    let members = null,
      ret = false,
      filter = {};

    if (type === Constants.snsInstagram)
      filter = {
        audience: {
          age: [],
          gender: null,
          interests: [],
          language: null,
          location: [process.env.NEXT_PUBLIC_REGION == 'SG' ? 536780 : 382313],
        },
        influencer: {
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
          relevance: [],
        },
      };
    else if (type === Constants.snsYoutube)
      filter = {
        audience: {
          age: [],
          gender: null,
          language: null,
          location: [process.env.NEXT_PUBLIC_REGION == 'SG' ? 536780 : 382313],
        },
        influencer: {
          engagementRate: null,
          followers: {},
          gender: null,
          hasContactDetails: null,
          interests: [],
          language: null,
          location: [],
          relevance: [],
          views: {},
        },
      };
    else
      filter = {
        audience: {
          age: [],
          gender: null,
          language: null,
          location: [process.env.NEXT_PUBLIC_REGION == 'SG' ? 536780 : 382313],
        },
        influencer: {
          bio: '',
          engagementRate: null,
          followers: {},
          gender: null,
          hasContactDetails: null,
          language: null,
          location: [],
          relevance: [],
          views: {},
        },
      };

    try {
      await apiWrapper
        .post(`${baseUrl}/${type}/search`, {
          sort: sort,
          page: page,
          filter: filter,
        })
        .then((response) => {
          if (response.error === false) {
            members = response;
          } else {
            ret = response.code;
          }
        })
        .catch((e) => {
          ret = e.code;
        });

      if (ret !== false)
        return res.status(200).json({
          status: 'no',
          msg: ret,
        });

      for (let itm of members.lookalikes) {
        itm.campaigns = await CampaignRepo.getAmongCampaignsUsingInfid(
          itm.userId,
        );
        itm.tags = await InfluencerRepo.getInfluencerTags(
          req.user.id,
          itm.userId,
        );
      }

      return res.status(200).json({
        status: 'ok',
        data: { total: members.total, data: members.lookalikes },
      });
    } catch (ex) {
      return res.status(200).json({
        status: 'no',
        msg: ex.toString(),
      });
    }
  }
}
