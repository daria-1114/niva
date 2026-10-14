import { useState } from 'react'
import './App.css'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import NotesList from './NotesList'
import CreateNoteForm from './CreateNoteForm'

const App = ()=>{
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleNoteCreated = () => {
    setRefreshKey(refreshKey + 1);
  };
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  if (!isLoggedIn) {
    return (
      <div>
        <h1>Niva</h1>
        <RegisterForm />
        <hr />
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }
  return (
    <div>
      <h1>Niva</h1>
      <button onClick={handleLogout}>Log out</button>
      <CreateNoteForm onNoteCreated={handleNoteCreated} />
      <hr />
      <NotesList refreshKey={refreshKey} />
    </div>
  )
}
export default App