import React, { useState, useEffect, useRef} from 'react';
import Layout from '@layout/Layout';
import Navbar from '@layout/Header/Navbar';
import HeroSectionEleven from '@components/hero-section/HeroSectionEleven';
import Web3Modal from "web3modal";
import { providers } from "ethers";


//this is for crypto landing demo

const CryptoLanding = () => {
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState();
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();

  /*
      connectWallet: Connects the MetaMask wallet
    */
      const connectWallet = async () => {
        try {
          // Get the provider from web3Modal, which in our case is MetaMask
          // When used for the first time, it prompts the user to connect their wallet
          let info = await getProviderOrSigner();
          setWalletConnected(true);
          localStorage.setItem('walletConnected', true);
          let accounts = info.listAccounts();
          if (accounts) accounts.then((a) =>{ //https://dev.to/ramonak/javascript-how-to-access-the-return-value-of-a-promise-object-1bck
            setAccount((a[0]));
            localStorage.setItem('account', a[0]);
          }); 
          
        } catch (err) {
          console.error(err);
        }
      };

      const getProviderOrSigner = async (needSigner = false) => {
        // Connect to Metamask
        // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
        const provider = await web3ModalRef.current.connect();
        const web3Provider = new providers.Web3Provider(provider);

          // If user is not connected to the Goerli network, let them know and throw an error
          const { chainId } = await web3Provider.getNetwork();
          if (chainId !== 80001) {
            window.alert("Change the network to Mumbai");
            throw new Error("Change network to Mumbai");
          }
      
          if (needSigner) {
            const signer = web3Provider.getSigner();
            return signer;
          }
          return web3Provider;
        };
  
        // useEffects are used to react to changes in state of the website
    // The array at the end of function call represents what state changes will trigger this effect
    // In this case, whenever the value of `walletConnected` changes - this effect will be called
    useEffect(() => {
      // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
      if (!walletConnected) {
        // Assign the Web3Modal class to the reference object by setting it's `current` value
        // The `current` value is persisted throughout as long as this page is open
        web3ModalRef.current = new Web3Modal({
          network: "mumbai",
          providerOptions: {},
          disableInjectedProvider: false,
        });
        connectWallet();
  
      }
    }, [walletConnected]);
  
      /*
        renderButton: Returns a button based on the state of the dapp
      */
    const renderNavbar = () => {
            return (
              <Navbar walletConnected={walletConnected} account={account} navDark={true} connect={connectWallet}/>
            );
        };

    const renderHero = () => {
          return (
            <HeroSectionEleven walletConnected={walletConnected} connect={connectWallet}/>
          );
      };

  return (
    <Layout>
      {renderNavbar()}
      {renderHero()}
    </Layout>
  );
};

export default CryptoLanding;
