import moment from 'moment';
import getConfig from 'next/config';
import {fetchWrapper} from 'helpers';

const {publicRuntimeConfig} = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/plans`;

export const planService = {
  closeCustom,
  getAllPlans,
  getUserInfo,
  getUsage,
  getCustomInfo,
  getHistory,
  removeHistory,
  savePlans,
  switchToCustom,
  saveToCustom,
  saveCustomHistory,
  switchPlan,
  updatePayStatus,
};

function updatePayStatus(userId, type, paystatus) {
  return fetchWrapper.post(`${baseUrl}/updatepaystatus`, {userId, type, paystatus});
}

function getUsage(userId) {
  return fetchWrapper.post(`${baseUrl}/getusage`, {userId});
}

function getUserInfo(userId) {
  return fetchWrapper.post(`${baseUrl}/getuserinfo`, {userId}); 
}

function closeCustom(userId, enddate) {
  return fetchWrapper.post(`${baseUrl}/closecustom`, {userId, enddate});
}

function getAllPlans() {
  return fetchWrapper.get(`${baseUrl}`);
}

function savePlans(enterprise, advanced, performance, essentials, trial) {
  return fetchWrapper.post(`${baseUrl}/update`, {
    enterprise, advanced, performance, essentials, trial
  }).then(response => {
    return response;
  });
}

function switchPlan(userId, type, amount, isAnnualy) {
  let startdate = moment().format('YYYY-MM-DD');
  return fetchWrapper.post(`${baseUrl}/switchplan`, {userId, type, startdate, amount, isAnnualy});
}

function switchToCustom(userId, startdate) {
  return fetchWrapper.post(`${baseUrl}/switchtocustom`, {userId, startdate});
}

function saveToCustom(userId, name, search, profile, report, csv, saves, startdate, enddate, usesearch, useprofile, usereport, usecsv, usesaves, updatemode, keyrequested, insight, campaign, keyaccount) {
  return fetchWrapper.post(`${baseUrl}/savetocustom`, {userId, name, search, profile, report, csv, saves, startdate, enddate, usesearch, useprofile, usereport, usecsv, usesaves, updatemode, keyrequested, insight, campaign, keyaccount});
}

function getCustomInfo(userId) {
  return fetchWrapper.post(`${baseUrl}/getcustom`, {userId});
}

function getHistory(userId) {
  return fetchWrapper.post(`${baseUrl}/gethistory`, {userId});
}

function removeHistory(userId, rowId) {
  return fetchWrapper.post(`${baseUrl}/removecustomhistory`, {userId, rowId});
}

function saveCustomHistory(userId, data, rowId) {
  return fetchWrapper.post(`${baseUrl}/savecustomhistory`, {userId, rowId, ...data});
}