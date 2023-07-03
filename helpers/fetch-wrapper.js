import getConfig from 'next/config';

import { userService } from 'services';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
  get,
  post,
  put,
  getForImage,
  delete: _delete,
};

function get(url, params = {}) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(url),
  };
  Object.keys(params).length !== 0 &&
    (url += '?' + new URLSearchParams(params).toString());
  return fetch(url, requestOptions).then(handleResponse);
  // .catch(error=>{
  //     console.log(error);
  // });
}

function post(url, body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader(url) },
    credentials: 'include',
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
  // .catch(err => {
  //     return Promise.reject('Communication error');
  // });
}

function getForImage(url) {
  const requestOptions = {
    method: 'GET',
    cache: 'no-cache',
    headers: { 'Content-Type': 'image/jpeg' },
  };
  return fetch(url, requestOptions);
}

function put(url, body) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader(url) },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
  // .catch(error=>{
  //     console.log(error);
  // });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(url),
  };
  return fetch(url, requestOptions).then(handleResponse);
  // .catch(error=>{
  //     console.log(error);
  // });
}

// helper functions

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = userService.userValue;
  const isLoggedIn = user && user.token;
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    try {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if ([401, 403].includes(response.status) && userService.userValue) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          userService.logout();
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    } catch (err) {
      console.log({ text });
      return err;
    }
  });
}
