import moment from 'moment';
import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/modash`;

export const modashService = {
  getAccounts,
  getProfileOverview,
  getProfileReport,
  getInterests,
  getLanguages,
  getLocations,
  getPDFUrls,
  searchAccounts,
  setInfluencers,
  updateProfileData,
};

function setInfluencers(type, keys, campId) {
  let curDate = moment().format('YYYY-MM-DD');
  return fetchWrapper.post(`${baseUrl}/setinfluencers`, {
    type,
    keys,
    curDate,
    campId,
  });
}

function getPDFUrls(userId, type) {
  let curDate = moment().format('YYYY-MM-DD');
  return fetchWrapper.post(`${baseUrl}/export`, { type, userId, curDate });
}

function searchAccounts(type, page, sort, filters, isReload) {
  let curDate = moment().format('YYYY-MM-DD');
  return fetchWrapper.post(`${baseUrl}/search`, {
    type,
    sort,
    page,
    filters,
    isReload,
    curDate,
  });
}

function getAccounts(type, page, sort, isReload) {
  let curDate = moment().format('YYYY-MM-DD');
  return fetchWrapper.post(`${baseUrl}/load`, {
    type,
    sort,
    page,
    isReload,
    curDate,
  });
}

function getProfileOverview() {
  let curDate = moment().format('YYYY-MM-DD');
  return fetchWrapper.post(`${baseUrl}/overview`, { curDate });
}

function getProfileReport(userId, type, avgViews) {
  let curDate = moment().format('YYYY-MM-DD');
  return fetchWrapper.post(`${baseUrl}/report`, {
    type,
    userId,
    curDate,
    avgViews,
  });
}

function updateProfileData(userId, type, avgViews) {
  let curDate = moment().format('YYYY-MM-DD');
  return fetchWrapper.post(`${baseUrl}/update`, {
    type,
    userId,
    curDate,
    avgViews,
  });
}

function getInterests(type) {
  return fetchWrapper.post(`${baseUrl}/interests`, { type });
}

function getLanguages(type) {
  return fetchWrapper.post(`${baseUrl}/languages`, { type });
}

function getLocations(type, keyword) {
  return fetchWrapper.post(`${baseUrl}/locations`, { type, keyword });
}
