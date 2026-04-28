"use client";

import { useState, useContext } from 'react';
import { api, setAuthToken } from '../../lib/api';
import { AppContext } from '../../components/Providers';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(AppContext);
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      // In a real app, we would make an API call to login, but for the MVP, we just mock it if the backend is not fully hooked up.
      // Wait, we DO have the backend hooked up!
      const res = await api.post('/api/auth/login', { email, password });
      setAuthToken(res.data.token);
      setUser(res.data.user);
      router.push('/colleges');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Note: Please register first.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
        <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-8">Welcome Back</h2>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-center text-sm">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg">Login</button>
        </form>
      </div>
    </div>
  );
}
