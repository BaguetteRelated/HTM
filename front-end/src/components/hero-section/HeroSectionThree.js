/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import HeroTitle from '../common/HeroTitle';

const HeroSectionThree = () => {
  return (
    <section
      className="hero-section ptb-120 position-relative overflow-hidden"
      style={{
        background: "url('/shape/color-particles-2.svg') no-repeat center top",
      }}
    >
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-xl-8 col-lg-10 mb-5">
            <div className="hero-content-wrap">
              <HeroTitle
                title="All these creators need your help"
                desc="Explore their project and vote up or down so other can explore web3 without worries"
              />
              <div
                className="action-btns text-center pt-4"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <Link href="/#">
                  <a className="btn btn-primary me-3"> Connect yout wallet</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div
              className="position-relative"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <ul className="position-absolute animate-element parallax-element widget-img-wrap z-2">
                <li className="layer" data-depth="0.04">
                  <img
                    src="/screen/widget-3.png"
                    alt="widget-img"
                    className="img-fluid widget-img-1 position-absolute shadow-lg rounded-custom"
                  />
                </li>
                <li className="layer" data-depth="0.02">
                  <img
                    src="/screen/widget-4.png"
                    alt="widget-img"
                    className="img-fluid widget-img-3 position-absolute shadow-lg rounded-custom"
                  />
                </li>
              </ul>
              <img
                src="/dashboard-img.png"
                alt="dashboard-img"
                className="img-fluid position-relative rounded-custom mt-5"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dark position-absolute bottom-0 h-25 bottom-0 left-0 right-0 z--1 py-5"></div>
    </section>
  );
};

export default HeroSectionThree;
