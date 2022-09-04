let baseUrl = 'http://localhost:5000/api/';
let mediaServerUrl = 'https://media.zypzap.com';

if (window.location.host === 'zypzap-admin-dev.falconweb.app') {
  baseUrl = 'https://zypzap-api-dev.falconweb.app/api/';
} else if (window.location.host === 'zypzap-admin-qa.falconweb.app') {
  baseUrl = 'https://zypzap-api-qa.falconweb.app/api/';
} else if (window.location.host === 'zypzap-admin-staging.falconweb.app') {
  baseUrl = 'https://zypzap-api-staging.falconweb.app/api/';
} else if (window.location.host === 'admin.zypzap.com') {
  baseUrl = 'https://api.zypzap.com/api/';
}

module.exports = { baseUrl, mediaServerUrl };
