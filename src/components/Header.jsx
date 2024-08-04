import React from 'react';

const Header = ({ onLogout, user }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <header className="bg-purple-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" className="ml-10 mt-1 h-16" alt="Quiz DotDan Logo" />
          <h1 className="text-2xl p-4 font-bold">Quiz DotDan</h1>
        </div>
        {user && (
          <div className="flex items-center">
            <span className="mr-4">Selamat mengerjakan, {user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
