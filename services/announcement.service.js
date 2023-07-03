import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/announcements`;

export const announcementService = {
  createAnnouncement,
  updateAnnouncement,
  getAll,
  getAnnouncements,
};

function createAnnouncement(args) {
  return fetchWrapper
    .post(`${baseUrl}/create`, { ...args })
    .then((response) => {
      return response;
    });
}

function updateAnnouncement(args) {
  return fetchWrapper.post(`${baseUrl}/update`, { ...args });
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getAnnouncements(args) {
  return fetchWrapper.get(`${baseUrl}/get`, { ...args });
}
