import { useState } from 'react'
import './App.css'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import NotesList from './NotesList'
import CreateNoteForm from './CreateNoteForm'
import AccountMenu from './AccountMenu'
import Sidebar from './Sidebar'
import AccountView from './AccountView'

const App = ()=>{
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAccount, setShowAccount] = useState(false);

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
      <div className="top-bar">
        <h1>Niva</h1>
        <AccountMenu onLogout={handleLogout} onShowAccount={() => setShowAccount(true)} />
      </div>
      {showAccount ? (
        <AccountView onBack={() => setShowAccount(false)} />
      ) : (
        <>
          <CreateNoteForm onNoteCreated={handleNoteCreated} />
          <div className="app-layout">
            <Sidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            <NotesList refreshKey={refreshKey} selectedCategory={selectedCategory} />
          </div>
        </>
      )}
    </div>
  )
}
export default App