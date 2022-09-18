/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import { IoPlayCircleOutline } from 'react-icons/io5';
import Image from 'next/image';
import ModalVideo from 'react-modal-video';

const HeroSectionOne = () => {
  const [isOpen, setOpen] = useState(false);
  return ( 
    <section
      className="hero-section ptb-120 text-white bg-gradient"
      style={{ background: "url('/hero-dot-bg.png')no-repeat center right" }}
    >
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="hAP2QF--2Dg"
        onClose={() => setOpen(false)}
      />
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-10">
            <div className="hero-content-wrap mt-5 mt-lg-0 mt-xl-0">
              <h1 className="fw-bold display-5">
                Get Fully Control and Visibility of Web3
              </h1>
              <p className="lead">
                Here see how you can contribuate to this amazing project
              </p>
              <div className="action-btns mt-5 align-items-center flex d-sm-flex d-lg-flex d-md-flex">
                <Link href="#">
                  <a className="btn btn-primary me-3">Connect your wallet</a>
                </Link>
                <div>
                    <a href='#!'
                      onClick={() => setOpen(true)}
                      type="button"
                      className="text-white text-decoration-none d-inline-flex align-items-center watch-now-btn"
                    >
                      <IoPlayCircleOutline className="me-2" /> Watch Demo
                    </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-8 mt-5">
            <div className="hero-img position-relative circle-shape-images">
              <img
                src="/hero-1.png"
                alt="hero img"
                className="img-fluid position-relative z-5"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionOne;
