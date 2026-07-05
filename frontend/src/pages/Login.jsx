import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await api.post('auth/login/', form);
      localStorage.setItem('token', res.data.access);
      toast.success('Login successful!');
      navigate('/');
    } catch {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <Toaster />
      <div className="bg-gray-900 p-8 rounded-2xl w-96 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>
        <input className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg mb-4 outline-none"
          placeholder="Username" onChange={e => setForm({...form, username: e.target.value})} />
        <input type="password" className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg mb-6 outline-none"
          placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
        <button onClick={handleSubmit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition">
          Login
        </button>
      </div>
    </div>
  );
}