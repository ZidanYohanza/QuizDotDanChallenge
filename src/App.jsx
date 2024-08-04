import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const userData = JSON.parse(localStorage.getItem('user'));
    if (loggedIn === 'true' && userData) {
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  const handleLogin = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('quizState'); // Optional: Remove quiz state on logout
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onLogout={handleLogout} user={user} />
      <main className="flex-grow">
        {isLoggedIn ? (
          <Quiz onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
