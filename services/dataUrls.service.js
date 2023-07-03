import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/dataUrls`;

export const dataUrlsService = {
  getData,
  addData,
};

function getData(hash) {
  return fetchWrapper.get(`${baseUrl}/get`, { hash });
}

function addData({ data }) {
  while (true) {
    try {
      return fetchWrapper.post(`${baseUrl}/create`, { data });
    } catch (e) {
      console.log({ errorInAddDataUrl: e });
    }
  }
}
