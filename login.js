
import React, { useState } from 'react';
import { login, getProtected, refresh, logout } from '../services/auth';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [token, setToken] = useState(null);
  const [protectedMsg, setProtectedMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login(form);
      setToken(accessToken);
      setProtectedMsg('Logged in.');
    } catch (err) {
      setProtectedMsg(err.response?.data?.message || 'Login error');
    }
  };

  const fetchProtected = async () => {
    try {
      const res = await getProtected(token);
      setProtectedMsg(res.data.message);
    } catch (err) {
      // try refresh once
      try {
        const r = await refresh();
        setToken(r.accessToken);
        const res2 = await getProtected(r.accessToken);
        setProtectedMsg(res2.data.message);
      } catch (err2) {
        setProtectedMsg('Unable to fetch protected resource');
      }
    }
  };

  const doLogout = async () => {
    await logout();
    setToken(null);
    setProtectedMsg('Logged out');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h2>Login</h2>
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>

      <div>
        <button onClick={fetchProtected}>Get Protected</button>
        <button onClick={doLogout}>Logout</button>
      </div>

      <div>{protectedMsg}</div>
    </div>
  );
}