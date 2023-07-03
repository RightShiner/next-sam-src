import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/monitoring`;

export const monitoringService = {
  getMonitoringById,
  setPosts,
  deletePosts,
  getGenderRateById,
  postHiddenList,
};

function getMonitoringById(campId, catType) {
  return fetchWrapper.get(`${baseUrl}`, { campId, catType });
}

function setPosts(data) {
  return fetchWrapper.post(`${baseUrl}/update`, { data });
}

function deletePosts(data) {
  return fetchWrapper.put(`${baseUrl}/update`, { data });
}

function getGenderRateById(data) {
  return fetchWrapper.post(`${baseUrl}/gender`, { data });
}

function postHiddenList(campId, hiddenList) {
  return fetchWrapper.post(`${baseUrl}/hidden?campId=${campId}`, {
    hiddenList,
  });
}
