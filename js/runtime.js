// Deployment endpoints belong here only. All business settings are fetched from the API.
export const API_BASE = ['localhost','127.0.0.1'].includes(location.hostname)
 ? 'http://127.0.0.1:3500' : 'https://fitness.mdmsportal.uk';
