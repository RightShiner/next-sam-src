import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/stripe`;

export const stripeService = {
  createSession,
};

function createSession(item, type) {
  return fetchWrapper.post(`${baseUrl}/createsession`, {item, type});
}
