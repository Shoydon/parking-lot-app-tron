import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Hero from './components/Home.jsx';
import Create from './components/Create.jsx';
import Nav from './components/Nav.jsx';
// import {TronWeb} from './tronwebs/dist/js/tronweb.js'
// const TronWeb = require('../node_modules/tronweb/dist/TronWeb.js')
import First from './components/First.js';
import contractData from './contract.json'
import MyBuildings from './components/MyListedBuildings.jsx';
import OwnedApartments from './components/OwnedApartments.jsx';

function App() {

  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [marketplace, setMarketplace] = useState({});
  const [connecteds,setConnecteds]=useState(false);
  const [fistTime,setFirstTime]=useState(false);
  // const [tronWeb, setTronWeb] = useState(null);

  //api=7f759d6c-3584-4d7c-a32f-15b6d4cd7a33
  
  const checkTronLink = async () => {
    // if (window && window.tronLink) {

    try {
      
      const tron = window.tronLink;
      const tronWeb = tron.tronWeb;
      setConnecteds(true)
      console.log("Inside checkTronLink");

    } catch (error) {
      console.log("This is error",error);
    }

    const acc = await window.tronLink.request({ method: 'tron_requestAccounts' });
    console.log("acc msg: ", acc.message);
    

        try {
          const tron = await window.tronLink;
          const tronWeb = await tron.tronWeb;
          console.log("This is ACC", acc);
          setFirstTime(true);
          // const publicAddress = tronWeb.defaultAddress.base58
          // console.log("This is owner publicAddress",publicAddress);
          setAccount(acc);
          setFirstTime(true);
        } catch (error) {
          console.error("Error connecting to TronLink:", error);
        
      }

  };
  const checkAccount = async () => {
    if (!account) {
      console.log("Check running inside checkAccount");
      await checkTronLink();
      // setTimeout(checkAccount, 1000); // Check again after 1 second
    }
  };

  useEffect(() => {
    if (account !== null) {
      initiContract();
      console.log("Instead of initContract");
    }
  }, [account]);
 
  const initiContract = async () => {
    try {
      const tron = window.tronLink;
      const tronWeb = tron.tronWeb;
      let marketplace = await tronWeb.contract(contractData.abi, contractData.address);
      // let marketplace = await tronWeb.contract(contractData.abi, contractData.address);
      // let marketplace = await tronWeb.contract(marketplace_abi, 'TQsMgi7PVhE2Tqbv2CjXj4zyHJTXpixraW');
      setMarketplace(marketplace);
      setLoading(false);
    } catch (error) {
      console.error("Error connecting to TronLink:", error);
    }
  };

  // const sendTra = async (ownerad) => {
  //   try {
  //     const tron = window.tronLink;
  //     const tronWeb = tron.tronWeb;
  //     const toAddress = ownerad.toString();
  //     console.log("To Adress",toAddress);
  //     // const toAddress = "TQsMgi7PVhE2Tqbv2CjXj4zyHJTXpixraW";
  //     const amountInSun = 1000000;
  //     const amountInHex = tronWeb.toHex(amountInSun);
  //     const tx = await tronWeb.trx.sendTransaction(toAddress, amountInHex);
  //     console.log("Transaction sent successfully:", tx);
  //     return tx;
  //   } catch (error) {
  //     console.error("Error sending transaction:", error);
  //   }
  // };
  
  return (

    <BrowserRouter>
      <ToastContainer />
      <div className="App font-jersey-25">
        <div className="gradient-bg-welcome">
          {/* <button onClick={connect}>Con</button> */}

          <Nav account={account} checkTronLink={checkTronLink} loading={loading}/>
          {
            loading && !fistTime ? (<First loading={loading}/>) : (
              <Routes>
              <Route path='/' element={<First loading={loading}/>}/>
                <Route path='/all-parking-lots' element={<Hero marketplace={marketplace} account={account}/>} />
                <Route path='/create' element={<Create marketplace={marketplace} />} />
                {/* <Route path='/listed-buildings' element={<MyBuildings />} /> */}
                <Route path='/my-bookings' element={<OwnedApartments />} />
                {/* <Route path='/my-purchases' element={<Purchaes marketplace={marketplace} account={account} />} /> */}
              </Routes>
            )}
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;












// useEffect(() => {
//   const connectW = async () => {
//     const wallet = new WalletConnectWallet({
  //       network: WalletConnectChainID.Nile,
  //       options: {
    //         relayUrl: 'wss://relay.walletconnect.com',
    //         projectId: 'a8417a68556ab44330ee0f1ab5a20558',
    //         metadata: {
//           name: 'JustLend',
//           description: 'JustLend WalletConnect',
//           url: 'https://app.justlend.org/',
//           icons: ['https://app.justlend.org/mainLogo.svg']
//         }
//       },
//       web3ModalConfig: {
  //         themeMode: 'dark',
  //         themeVariables: {
//           '--w3m-z-index': 1000
//         },
//         explorerRecommendedWalletIds: [
  //           '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
  //           '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
  //         ]
  //       }
  //     });
  
  //     const { address } = await wallet.connect();
  //     console.log("Address",address);
  //   }
  //   connectW();
  
  // let acc;
  
  // useEffect(() => {
  //   console.log("This is account",account);
  //   if(account===null)
  //   {
  
  //     connect();
  //     initiContract(); 
  //   }
  //   else{
  //     initiContract();
  //   }
  //   // setLoading(false);
  // }, []); 
  
  
  // const initiContract=async ()=>{
  //   try {
  //     const tron = window.tronLink;
  //     const tronWeb = tron.tronWeb; 
  //     let marketplace = await tronWeb.contract(marketplace_abi, 'TQsMgi7PVhE2Tqbv2CjXj4zyHJTXpixraW');
  //     setMarketplace(marketplace);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error connecting to TronLink:", error);
  //   }
  // }
  
  // const connect = async () => {
  //   if (account===null) {
  //     const acc = await window.tronLink.request({ method: 'tron_requestAccounts' });
  //     console.log("This is ACC", acc);
  //     setAccount(acc);
  //   }
  //   else{
  //     console.log("Else connect",account);
  //   }
  // }
  
  // const gettingTokenCount = async () => {
  //   if (window && window.tronLink) {
  //     try {
  //       const tron = window.tronLink;
  //       const tronWeb = tron.tronWeb; // Moved inside try block
  //       let marketplace = await tronWeb.contract(marketplace_abi, 'TQsMgi7PVhE2Tqbv2CjXj4zyHJTXpixraW');
  //       setMarketplace(marketplace);
  //       let result = await marketplace.seeNFT(1).call();
  //       let results = await marketplace.itemCount().call();
  //       console.log("This is result", result);
  //       console.log("This is results", results.toString());
  //       const itemCount = results.toString();
  //       console.log("This is App item count", itemCount);
  //     } catch (error) {
  //       console.error("Error getting token count:", error);
  //     }
  //   }
  // }
  // const tron = window.tronLink;
  // const tronWeb = tron.tronWeb;
  // const sendTra = async () => {
  //   try {
  //     // Specify the recipient address
  //     const tron = window.tronLink;
  //     const tronWeb = tron.tronWeb; 
  //     const toAddress = "TQsMgi7PVhE2Tqbv2CjXj4zyHJTXpixraW";
  
  //     // Specify the amount of TRX to send (in SUN)
  //     const amountInSun = 1000000; // For example, 1 TRX (1000000 SUN)
  
  //     // Convert the amount to hex (required by TronWeb)
  //     const amountInHex = tronWeb.toHex(amountInSun);
  
  //     // Send the transaction
  //     const tx = await tronWeb.trx.sendTransaction(toAddress, amountInHex);
  
  //     console.log("Transaction sent successfully:", tx);
  //     return tx;
  //   } catch (error) {
  //     console.error("Error sending transaction:", error);
  //   }
  // };
// }, []);