import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/influencers`;

export const accountService = {
  appendTag,
  getCampaingsDetail,
  getCampaigns,
  getAllCampaigns,
  getInfluencers,
  getInfluencerByTag,
  getInfluencerTags,
  getTagList,
  removeTag,
  updateAccount,
  updateAllAmongCampiangs,
  updateAmongCampiangs,
  updateInfluencerTags,
};

function removeTag(selId) {
  return fetchWrapper.post(`${baseUrl}/removeTag`, { selId });
}

function appendTag(name, color, tagId) {
  return fetchWrapper.post(`${baseUrl}/appendTag`, { name, color, tagId });
}

function getTagList() {
  return fetchWrapper.get(`${baseUrl}/getTagList`);
}

function getInfluencers(userId, type, filters, page) {
  return fetchWrapper.post(`${baseUrl}/getInfluencers`, {
    userId,
    type,
    filters,
    page,
  });
}

function getCampaingsDetail(id) {
  return fetchWrapper.post(`${baseUrl}/getCampaingsDetail`, { id });
}

function getInfluencerTags(accountId) {
  return fetchWrapper.post(`${baseUrl}/getinfluencertags`, { accountId });
}

function getInfluencerByTag(page, sort, filters, isReload) {
  return fetchWrapper.post(`${baseUrl}/getInfluencerByTag`, {
    page,
    sort,
    filters,
    isReload,
  });
}

function getCampaigns(infId, catType) {
  return fetchWrapper.post(`${baseUrl}/getcampaigns`, { infId, catType });
}

function getAllCampaigns(catType) {
  return fetchWrapper.post(`${baseUrl}/getAllCampaigns`, { catType });
}

function updateAccount(id, star, memo) {
  return fetchWrapper.post(`${baseUrl}/update`, { id, star, memo });
}

function updateAllAmongCampiangs(
  ids,
  avgViews,
  campId,
  checkStatus,
  cattype,
  curDate,
) {
  return fetchWrapper
    .post(`${baseUrl}/saveall`, {
      ids,
      avgViews,
      campId,
      checkStatus,
      cattype,
      curDate,
    })
    .then((response) => {
      return response;
    });
}

function updateAmongCampiangs(
  id,
  campId,
  checkStatus,
  cattype,
  curDate,
  avgViews,
) {
  return fetchWrapper
    .post(`${baseUrl}/save`, {
      id,
      campId,
      checkStatus,
      cattype,
      curDate,
      avgViews,
    })
    .then((response) => {
      return response;
    });
}

function updateInfluencerTags(accountId, tagId, checkStatus) {
  return fetchWrapper.post(`${baseUrl}/updateinfluencertags`, {
    accountId,
    tagId,
    checkStatus,
  });
}
