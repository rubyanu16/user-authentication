
import React, { useState } from 'react';
import { register } from '../services/auth';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      setMsg('Registered. Please login.');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
      <div>{msg}</div>
    </form>
  );
}