import React, { useEffect } from 'react';

const GoogleLogin = ({ onLogin }) => {
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '383174705936-3mp4r4jdiu897diqtoi23a11ife22gef.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById('google-signin'),
      { theme: 'outline', size: 'large' }
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);

  const handleCredentialResponse = (response) => {
    const token = response.credential;
    const user = JSON.parse(atob(token.split('.')[1]));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(user));
    onLogin();
  };

  return <div id="google-signin"></div>;
};

export default GoogleLogin;
