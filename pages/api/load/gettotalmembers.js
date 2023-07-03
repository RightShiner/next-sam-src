const jwt = require('jsonwebtoken');
import { apiHandler } from 'middlewares';

import getConfig from 'next/config';
import { apiWrapper } from 'helpers';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
const { serverRuntimeConfig } = getConfig();
const baseUrl = `${serverRuntimeConfig.modashUrl}`;

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getTotalCounts();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function getTotalCounts() {
    console.log(`/api/load/gettotalmembers`);

    let instagrams = 0,
      youtubes = 0,
      tiktoks = 0;
    let msg = '';

    const instagramfilter = {
      audience: {
        age: [],
        gender: null,
        interests: [],
        language: null,
        location: [
          1543125,
          358674,
          900329,
          4085749,
          357794,
          2689482,
          2679956,
          3962762,
          1767047,
        ],
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
    await apiWrapper
      .post(`${baseUrl}/instagram/search`, {
        sort: { field: 'followers', direction: 'desc' },
        page: 0,
        filter: instagramfilter,
      })
      .then((response) => {
        if (response.error === false) instagrams = response.total;
        else msg = response.code;
      })
      .catch((e) => {
        msg = e.code;
      });

    if (msg !== '')
      return res.status(200).json({
        status: 'no',
        msg: msg,
      });

    const youtubefilter = {
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
    await apiWrapper
      .post(`${baseUrl}/youtube/search`, {
        sort: { field: 'followers', direction: 'desc' },
        page: 0,
        filter: youtubefilter,
      })
      .then((response) => {
        if (response.error === false) youtubes = response.total;
        else msg = response.code;
      })
      .catch((e) => {
        msg = e.code;
      });

    if (msg !== '')
      return res.status(200).json({
        status: 'no',
        msg: msg,
      });

    const tiktokfilter = {
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
    await apiWrapper
      .post(`${baseUrl}/tiktok/search`, {
        sort: { field: 'followers', direction: 'desc' },
        page: 0,
        filter: tiktokfilter,
      })
      .then((response) => {
        if (response.error === false) tiktoks = response.total;
        else msg = response.code;
      })
      .catch((e) => {
        msg = e.code;
      });

    if (msg !== '')
      return res.status(200).json({
        status: 'no',
        msg: msg,
      });

    return res.status(200).json({
      status: 'ok',
      data: { instagrams, youtubes, tiktoks },
    });
  }
}
