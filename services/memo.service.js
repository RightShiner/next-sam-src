import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/memo`;

export const memoService = {
  setMemo,
  getMemo,
};

function setMemo(data) {
  return fetchWrapper.post(`${baseUrl}/save`, { data });
}

function getMemo(data) {
  return fetchWrapper.post(`${baseUrl}`, { data });
}
