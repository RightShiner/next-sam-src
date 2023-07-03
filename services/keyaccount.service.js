import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/keyaccount`;

export const keyaccountService = {
  newRequest,
  getRequest,
};

function newRequest(data) {
  return fetchWrapper.post(`${baseUrl}`, { data });
}

function getRequest(type) {
  return fetchWrapper.get(`${baseUrl}?type=${type}`);
}
