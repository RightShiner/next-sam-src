import getConfig from 'next/config';

import {fetchWrapper} from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/load`;

export const loadService = {
  downloadInfluencers,
  getlastupdated,
  getTotalInfluencers,
  setlastUpdated
};

function downloadInfluencers(type, lists) {
  return fetchWrapper.post(`${baseUrl}/downloads`, {type, lists});
}

function getlastupdated() {
  return fetchWrapper.get(`${baseUrl}/lastupdated`);
}

function getTotalInfluencers() {
  return fetchWrapper.get(`${baseUrl}/gettotalmembers`); 
}

function setlastUpdated(status, type, downs, totals, error, updated) {
  return fetchWrapper.post(`${baseUrl}/updatestatus`, {status, type, downs, totals, error, updated});
}