import React from 'react';
import Layout from '@layout/Layout';
import Navbar from '@layout/Header/Navbar';
import Footer from '@layout/Footer/Footer';
import OurOffice from '@components/our-office/OurOffice';
import SupportOne from '@components/support/SupportOne';
import TestimonialTwo from '@components/testimonial/TestimonialTwo';



const AboutUs = () => {
  return (
    <Layout title="About Us" desc="this is about us page">
      <Navbar classOption="navbar-light" />
      <TestimonialTwo />
      <OurOffice />
      <SupportOne className="true" />
      <Footer footerLight />
    </Layout>
  );
};

export default AboutUs;
