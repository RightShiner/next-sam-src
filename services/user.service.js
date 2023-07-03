import moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem('user')),
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  changePwd,
  login,
  logout,
  createUser,
  updateUser,
  getAll,
  getLoginHistory,
  emailCheck,
  setAgree,
  setPostingMethod,
  getPostingMethod,
};

function setAgree(userId) {
  return fetchWrapper.post(`${baseUrl}/setagree`, { userId });
}

function changePwd(userId, newpwd) {
  return fetchWrapper.post(`${baseUrl}/changepwd`, { userId, newpwd });
}

function emailCheck(email) {
  return fetchWrapper.post(`${baseUrl}/check`, { email }).then((response) => {
    return response;
  });
}

function login(username, password) {
  const loginAt = moment().format('YYYY-MM-DD HH:mm:ss');
  return fetchWrapper
    .post(`${baseUrl}/authenticate`, { username, password, loginAt })
    .then((user) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      userSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function logout() {
  return fetchWrapper.get(`${baseUrl}/logout`).then((response) => {
    localStorage.clear();
    userSubject.next(null);
  });
}

function createUser(args) {
  return fetchWrapper
    .post(`${baseUrl}/create`, { ...args })
    .then((response) => {
      return response;
    });
}

function updateUser(args) {
  return fetchWrapper.post(`${baseUrl}/update`, { ...args });
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getLoginHistory(userId) {
  return fetchWrapper.post(`${baseUrl}/loginhistory`, { userId });
}

function setPostingMethod(id, data) {
  return fetchWrapper.post(`${baseUrl}/postingmethod`, { id, data });
}

function getPostingMethod(id) {
  return fetchWrapper.get(`${baseUrl}/postingmethod?id=${id}`);
}
