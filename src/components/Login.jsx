import React, { useState } from 'react';
import GoogleLogin from './GoogleLogin';

const Login = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'zidan@gmail.com' && password === 'zidan123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify({ name, email }));
      onLogin();
    } else {
      alert('Email atau password salah');
    }
  };

  return (
    <div className="bg-[url('/public/vbg.jpg')] bg-cover h-[700px] flex flex-col items-center justify-center">
      <div className="">
        <h1 className="text-5xl mb-10 font-bold text-purple-800 font text-center">Selamat Datang di Quiz DotDan</h1>
        <div className="bg-white p-8 rounded-2xl mx-20 shadow-md w-full max-w-md mb-">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password:</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-purple-800 text-white py-2 px-4 rounded hover:bg-purple-200 transition duration-200"
            >
              Login
            </button>
          </form>
          <div className="mt-4 ml-16">
            <p className="mb-4">Atau Login menggunakan akun google</p>
            <GoogleLogin onLogin={onLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
