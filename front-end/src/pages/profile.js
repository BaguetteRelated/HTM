import React, { useState,useLayoutEffect, useEffect, useRef} from 'react';
import Layout from '@layout/Layout';
import Navbar from '@layout/Header/Navbar';
import Footer from '@layout/Footer/Footer';
import OurStory from '@components/our-story/OurStory';
import FeatureImgContentTwo from '@components/feature-img-content/FeatureImgContentTwo';



const AboutUs = () => {
  const [account, setAccount] = useState();
  const [walletConnected, setWalletConnected] = useState();

  useLayoutEffect(() => {
    if (localStorage.getItem('account')) {
      setAccount(localStorage.getItem('account'));
    }
    if (localStorage.getItem('walletConnected')) {
      setWalletConnected(true);
    }
  }, [])

  return (
    <Layout title="About Us" desc="this is about us page">
      <Navbar walletConnected={walletConnected} account={account} navDark={true}  classOption="navbar-light"/>
      <FeatureImgContentTwo account={account} />
    </Layout>
  );
};

export default AboutUs;
