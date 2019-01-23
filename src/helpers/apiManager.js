// Libraries
import Promise from 'bluebird';
import axios from 'axios';

// config
import config from '../config';

// #1. json
const api = (url, params, isApiKey, keycloak, isTokenRefreshed) => {
  return new Promise((resolve, reject) => {
    const dxUrl = config.apiHost + url;
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    if (keycloak) {
      headers.Authorization = `Bearer ${keycloak.token}`;
    }
    if (isApiKey) {
      headers['api-key'] = config.apiKey;
    }

    axios
      .create({ headers })
      .post(dxUrl, params)
      .then(response => {
        if (response.statusText !== 'OK') {
          reject({ Message: 'API external error' });
          return;
        }
        resolve({
          data: response.data,
          keycloak,
          isTokenRefreshed
        });
        return;
      })
      .catch(error => {
        if (!error.response) {
          reject({ Message: 'API external error' });
          return;
        }
        if (!error.response.data) {
          reject({ Message: 'API internal error' });
          return;
        }
        reject(error.response.data);
        return;
      });
  });
};

export const dxApi = async (url, params, isApiKey, keycloak) => {
  try {
    let validKeycloak = keycloak;
    let isTokenRefreshed;
    if (keycloak) {
      const isTokenExpired = keycloak.isTokenExpired();
      if (isTokenExpired) {
        isTokenRefreshed = true;
        keycloak
          .updateToken()
          .success(function() {
            console.log('token refreshed');
            validKeycloak = keycloak;
          })
          .error(function() {
            console.log('failed to refresh token');
            throw new Error('Login required');
          });
      }
      validKeycloak = keycloak;
    }
    return api(url, params, isApiKey, validKeycloak, isTokenRefreshed);
  } catch (error) {
    console.log('redirect: ', error);
    throw new Error('Login required');
  }
};

// #2 form data
const fileApi = (url, formData, isApiKey, keycloak, isTokenRefreshed) => {
  return new Promise((resolve, reject) => {
    const dxUrl = config.apiHost + url;
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    };
    if (keycloak) {
      headers.Authorization = `Bearer ${keycloak.token}`;
    }
    if (isApiKey) {
      headers['api-key'] = config.apiKey;
    }

    axios
      .create({ headers })
      .post(dxUrl, formData)
      .then(response => {
        if (response.statusText !== 'OK') {
          reject({ Message: 'API external error' });
          return;
        }
        resolve({
          data: response.data,
          keycloak,
          isTokenRefreshed
        });
        return;
      })
      .catch(error => {
        if (!error.response) {
          reject({ Message: 'API external error' });
          return;
        }
        if (!error.response.data) {
          reject({ Message: 'API internal error' });
          return;
        }
        reject(error.response.data);
        return;
      });
  });
};
export const dxFileApi = (url, formData, isApiKey, keycloak) => {
  try {
    let validKeycloak = keycloak;
    let isTokenRefreshed;
    if (keycloak) {
      const isTokenExpired = keycloak.isTokenExpired();
      if (isTokenExpired) {
        isTokenRefreshed = true;
        keycloak
          .updateToken()
          .success(function() {
            console.log('token refreshed');
            validKeycloak = keycloak;
          })
          .error(function() {
            console.log('failed to refresh token');
            throw new Error('Login required');
          });
      }
      validKeycloak = keycloak;
    }
    return fileApi(url, formData, isApiKey, validKeycloak, isTokenRefreshed);
  } catch (error) {
    console.log('redirect: ', error);
    throw new Error('Login required');
  }
};

// #3 html fetch
export const dxHtmlApi = url => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.responseText);
        return;
      } else {
        resolve('');
        return;
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  });
};
