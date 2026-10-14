import { useState } from 'react'
import './App.css'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import NotesList from './NotesList'
import CreateNoteForm from './CreateNoteForm'

const App = ()=>{
  const [refreshKey, setRefreshKey] = useState(0);

  const handleNoteCreated = () => {
    setRefreshKey(refreshKey + 1);
  };
  return(
   <div>
      <h1>Niva</h1>
      <RegisterForm />
      <hr />
      <LoginForm />
      <hr/>
      <CreateNoteForm onNoteCreated={handleNoteCreated}/>
      <hr/>
      <NotesList refreshKey={refreshKey}/>
      
    </div>
  )
}
export default App