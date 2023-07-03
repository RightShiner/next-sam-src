import moment from 'moment';
import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/v1`;

export const astreamService = {
  getOptions,
  getInstagramUsers,
  getYoutubeUsers,
  getTiktokUsers,
  getInstagramHashtags,
  getInstagramTopics,
  getYoutubeTopics,
  getTiktokTopics,
  getInstagramFeed,
  getInstagramReels,
  getInstagramStories,
};

function getOptions(keyword) {
  return fetchWrapper.get(`${baseUrl}/raw/ig/search`, { keyword: keyword });
}

function getInstagramUsers(keyword) {
  return fetchWrapper.get(`${baseUrl}/instagram/users`, {
    limit: 5,
    query: keyword,
  });
}

function getYoutubeUsers(keyword) {
  return fetchWrapper.get(`${baseUrl}/youtube/users`, {
    limit: 5,
    query: keyword,
  });
}

function getTiktokUsers(keyword) {
  return fetchWrapper.get(`${baseUrl}/tiktok/users`, {
    limit: 5,
    query: keyword,
  });
}

function getInstagramHashtags(keyword) {
  return fetchWrapper.get(`${baseUrl}/instagram/hashtags`, {
    limit: 5,
    query: keyword,
  });
}

function getInstagramTopics(keyword) {
  return fetchWrapper.get(`${baseUrl}/instagram/topics`, {
    limit: 5,
    query: keyword,
  });
}

function getYoutubeTopics(keyword) {
  return fetchWrapper.get(`${baseUrl}/youtube/topics`, {
    limit: 5,
    query: keyword,
  });
}

function getTiktokTopics(keyword) {
  return fetchWrapper.get(`${baseUrl}/tiktok/topics`, {
    limit: 5,
    query: keyword,
  });
}

function getInstagramFeed(username) {
  return fetchWrapper.get(`${baseUrl}/raw/ig/user-feed`, { url: username });
}

async function getInstagramReels(username) {
  return fetchWrapper.get(`${baseUrl}/raw/ig/user-reels`, { url: username });
}

function getInstagramStories(username) {
  return fetchWrapper.get(`${baseUrl}/raw/ig/user-stories`, { url: username });
}
