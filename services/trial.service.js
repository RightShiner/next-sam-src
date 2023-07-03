import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/trial`;

export const trialService = {
  findAll,
  createTrial,
  updateTrial,
  deleteTrial,
  createUser,
  findAllTrialUsers,
};

function findAll() {
  return fetchWrapper.get(`${baseUrl}`);
}

function createTrial(args) {
  return fetchWrapper.post(`${baseUrl}`, { ...args });
}

function updateTrial(id, args) {
  return fetchWrapper.put(`${baseUrl}/${id}`, { ...args });
}

function deleteTrial(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}

function createUser(id, args) {
  return fetchWrapper.post(`${baseUrl}/${id}/create_user`, { ...args });
}

function findAllTrialUsers() {
  return fetchWrapper.get(`${baseUrl}/users`);
}
