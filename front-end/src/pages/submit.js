import React, { useState,useLayoutEffect, useEffect, useRef} from 'react';
import Layout from '@layout/Layout';
import Navbar from '@layout/Header/Navbar';
import OurOffice from '@components/our-office/OurOffice';
import TestimonialTwo from '@components/testimonial/TestimonialTwo';
import ContactForm from '@components/contact-us/ContactForm';
import { ProjectContractAbi, ProjectContractAddress } from "../constants";

const AboutUs = () => {
  const [account, setAccount] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);

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
      <ContactForm contractAddress={ProjectContractAddress} abi={ProjectContractAbi} />
    </Layout>
  );
};

export default AboutUs;
