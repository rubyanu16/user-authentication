
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true // for cookies
});

export async function register(data) {
  return API.post('/auth/register', data);
}

export async function login(data) {
  const resp = await API.post('/auth/login', data);
  return resp.data; // contains accessToken
}

export async function refresh() {
  const resp = await API.post('/auth/refresh');
  return resp.data;
}

export async function logout() {
  return API.post('/auth/logout');
}

export async function getProtected(accessToken) {
  return API.get('/protected', { headers: { Authorization: `Bearer ${accessToken}` } });
}