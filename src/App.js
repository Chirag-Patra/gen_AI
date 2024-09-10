import React from 'react';

import ChatUI from './chatUI';
import './chatUI.css'
import MyNavbar from './components/navbar';
import './index.css'; 
import Sidebar from './components/sidebar';


function App() {
  return (
    <div>

      <MyNavbar />
      <Sidebar/>

      <ChatUI />
    </div>
  );
}

export default App;