import { useState } from "react";
import {User} from 'lucide-react'

function AccountMenu({onLogout, onShowAccount}){
    const [isOpen, setIsOpen] = useState(false);
    return (
    <div className="account-menu">
      <button className="account-button" onClick={() => setIsOpen(!isOpen)}>
        <User size={20} />
      </button>
      {isOpen && (
        <div className="account-menu-dropdown">
          <button onClick={() => { setIsOpen(false); onShowAccount(); }}>Account</button>
          <button onClick={onLogout}>Log out</button>
        </div>
      )}
    </div>
  );
}
export default AccountMenu;