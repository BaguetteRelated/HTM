import React from 'react';
import Layout from '@layout/Layout';
import Navbar from '@layout/Header/Navbar';
import Footer from '@layout/Footer/Footer';
import HeroSectionOne from '@components/hero-section/HeroSectionOne';
import WorkProcessFour from '@components/workprocess/WorkProcessFour';


const AboutUs = () => {
  return (
    <Layout title="About Us" desc="this is about us page">
      <Navbar classOption="navbar-light" />
      <HeroSectionOne />
      <WorkProcessFour />
      <WorkProcessFour />
      <WorkProcessFour />
      <Footer footerLight />
    </Layout>
  );
};

export default AboutUs;
