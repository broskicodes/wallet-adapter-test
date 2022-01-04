import './App.css';
import { Uploader, Minter, Wallet } from './Components';
import React, { useState, useEffect } from 'react';


function App() {
  // const [wallet, setWallet] = useState(null);

  return (
    <div className="App">
      <Wallet 
        // wallet={wallet}
        // setWallet={setWallet}  
      >
      </Wallet>
      <Uploader />
      <Minter />  

    </div>
  );
}

export default App;
