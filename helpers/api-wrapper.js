import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

export const apiWrapper = {
  get,
  post,
  postForPDF,
};

function get(url, params = {}) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Access-Control-Allow-Origin': '*', ...authHeader() },
  };
  Object.keys(params).length !== 0 &&
    (url += '?' + new URLSearchParams(params).toString());
  return fetch(url, requestOptions).then(handleResponse);
}

function postForPDF(url) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader() },
  };

  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(body),
  };

  return fetch(url, requestOptions).then(handleResponse);
}

function authHeader() {
  return { Authorization: `Bearer ${serverRuntimeConfig.modashToken}` };
}

function handleResponse(response) {
  return response.text().then((text) => {
    try {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if ([401, 403, 500].includes(response.status)) {
          return Promise.reject(data);
        }

        return Promise.reject('Error');
      }

      return data;
    } catch (err) {
      console.log({ text });
      return err;
    }
  });
}
