import getConfig from 'next/config';
import moment from 'moment';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/campaigns`;

export const campaignService = {
  addNewReport,
  addNewReportYoutube,
  addNewReportTiktok,
  createCampaign,
  updateCampaign,
  changeName,
  downloadCSVData,
  getCampagin,
  getCampaignDetail,
  getCampaignList,
  updateMemberAmount,
  updateMemberStatus,
  updateReport,
  updateReportYoutube,
  updateReportTiktok,
  switchFlag,
  setMonitoring,
  getMonitoring,
  updateCampaignInfluencers,
};

function switchFlag(campId, value, type) {
  return fetchWrapper.post(`${baseUrl}/switchvisible`, { campId, value, type });
}

function addNewReport(campId, memId, rtype) {
  return fetchWrapper.post(`${baseUrl}/addnewreport`, { campId, memId, rtype });
}

function addNewReportYoutube(campId, memId) {
  return fetchWrapper.post(`${baseUrl}/addnewreportyoutube`, { campId, memId });
}

function addNewReportTiktok(campId, memId) {
  return fetchWrapper.post(`${baseUrl}/addnewreporttiktok`, { campId, memId });
}

function changeName(campId, name) {
  return fetchWrapper
    .post(`${baseUrl}/changename`, { campId, name })
    .then((response) => {
      return response;
    });
}

function createCampaign(name, sns, type, list) {
  return fetchWrapper
    .post(`${baseUrl}/create`, { name, sns, type, list })
    .then((response) => {
      return response;
    });
}

async function updateCampaign(cmpId, name, sns, type, list) {
  return fetchWrapper
    .put(`${baseUrl}/create`, { cmpId, name, sns, type, list })
    .then((response) => {
      return response;
    });
}

function downloadCSVData(campId, type) {
  let curDate = moment().format('YYYY-MM-DD');
  return fetchWrapper.post(`${baseUrl}/downloadcsv`, { campId, type, curDate });
}

function getCampagin(campId) {
  return fetchWrapper.post(`${baseUrl}/detail`, { campId });
}

function getCampaignDetail(campId, type, page = 1) {
  return fetchWrapper.post(`${baseUrl}/detailInfo`, { campId, type, page });
}

function getCampaignList(userId) {
  return fetchWrapper.get(`${baseUrl}?userId=${userId}`);
}

function updateMemberAmount(campId, memId, accId, amount) {
  return fetchWrapper.post(`${baseUrl}/updatememberamount`, {
    campId,
    memId,
    accId,
    amount,
  });
}

function updateMemberStatus(campId, step, memId, status) {
  return fetchWrapper.post(`${baseUrl}/updatememberstatus`, {
    campId,
    step,
    memId,
    status,
  });
}

function updateReport(campId, datas = []) {
  return fetchWrapper.post(`${baseUrl}/updateReport`, { campId, datas });
}

function updateReportYoutube(campId, datas = []) {
  return fetchWrapper.post(`${baseUrl}/updateReportYoutube`, { campId, datas });
}

function updateReportTiktok(campId, datas = []) {
  return fetchWrapper.post(`${baseUrl}/updateReportTiktok`, { campId, datas });
}

function getMonitoring(campId) {
  return fetchWrapper.get(`${baseUrl}/monitoring?campId=${campId}`);
}

function setMonitoring(campId, data) {
  return fetchWrapper.post(`${baseUrl}/monitoring`, { campId, data });
}

function updateCampaignInfluencers(campId, type) {
  return fetchWrapper.post(`${baseUrl}/updateCampaignInfluencers`, {
    campId,
    type,
  });
}
