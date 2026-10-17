import { useState, useEffect } from 'react';
import { apiFetch } from './api.js';

function AccountView({ onBack }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchMe() {
      const response = await apiFetch('/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    }
    fetchMe();
  }, []);

  if (!user) {
    return <div className="account-view">Loading...</div>;
  }

  return (
    <div className="account-view">
      <h2>Account</h2>
      <p><strong>First name:</strong> {user.firstName}</p>
      <p><strong>Last name:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={onBack}>Back to notes</button>
    </div>
  );
}

export default AccountView;