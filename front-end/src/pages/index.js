import React from 'react';
import Layout from '@layout/Layout';
import Navbar from '@layout/Header/Navbar';
import HeroSectionEleven from '@components/hero-section/HeroSectionEleven';

//this is for crypto landing demo

const CryptoLanding = () => {
  return (
    <Layout>
      <Navbar navDark />
      <HeroSectionEleven />
    </Layout>
  );
};

export default CryptoLanding;
