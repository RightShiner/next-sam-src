import getConfig from 'next/config';

import {fetchWrapper} from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/image`;

export const imageService = {
  getImageURL,
};

function getImageURL(url) {
  return fetchWrapper.getForImage(`${baseUrl}?url=${url}`);
}