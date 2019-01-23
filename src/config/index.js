import * as helpers from '../helpers';

const apiHost = () => {
  let url = window.location.href;
  // specific target api path
  if (url.includes('localhost')) {
    return 'http://localhost:3000';
  }
  return `https://${helpers.getOrgUrl()}-api.publishxi.com`;
};

// const apiHost = 'http://localhost:3000';
// const apiHost = 'https://dev-api.publishxi.com';
const appHost = 'https://dev-app.publishxi.com';
const h5pHost = 'https://dev-h5p.publishxi.com';

export default {
  apiHost: apiHost(),
  picHost: `${apiHost()}/picture?ImageGUID=`,
  fileHost: `${apiHost()}/uploads`,

  appHost: appHost,
  h5pHost: h5pHost,

  apiKey: '80ac2e02-7bfc-4e56-bcfc-0d94a6b4f6eb',

  textEditorWordLimit: 500,
  experienceLimit: 8,
  channelLimit: 5,
  defaultElementPadding: 12,
  defaultCardPadding: 6,

  keycloakHost: 'http://localhost:8080/auth',
  keycloakClientID: 'nodejs-connect'
};
