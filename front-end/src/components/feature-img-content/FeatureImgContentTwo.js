import React from 'react';
import Image from 'next/image';
import {
  FaBezierCurve,
  FaCheckCircle,
  FaCog,
  FaFingerprint,
} from 'react-icons/fa';

const FeatureImgContentTwo = ({ account, bgWhite }) => {
  return (
    <section className={`feature-section-two ptb-120 ${
      bgWhite ? 'bg-white' : 'bg-light'
    } `}>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 col-md-12">
            <div className="section-heading">
              <h4 className="h5 text-primary">Yo world ! Welcome here !</h4>
              <h2>You are more than numbers and letters</h2>
              <p>
                If you are here that means you are a active member of our community.
                So helps others being safe during their web3 travel by submitting safe projects
                and by voting for those yo used or you are using now.
              </p>
              <ul className="list-unstyled mt-5">
                <li className="d-flex align-items-start mb-4">
                  <div className="icon-box bg-danger rounded me-4">
                    <span className="fas text-white">
                      <FaFingerprint className="fa-lg" />
                    </span>
                  </div>
                  <div className="icon-content">
                    <h3 className="h5">Your account</h3>
                    <p>
                      {account}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-7">
            <div className="feature-img-wrap position-relative d-flex flex-column align-items-end">
              <ul className="img-overlay-list list-unstyled position-absolute">
                <li className="d-flex align-items-center bg-white rounded shadow-sm p-3">
                  <FaCheckCircle className="fas fa-2x me-2 text-primary mb-1" />
                  <h6 className="mb-0">Create a Free Account</h6>
                </li>
                <li className="d-flex align-items-center bg-white rounded shadow-sm p-3">
                  <FaCheckCircle className="fas fa-2x me-2 text-primary mb-1" />
                  <h6 className="mb-0">Submit your project</h6>
                </li>
                <li className="d-flex align-items-center bg-white rounded shadow-sm p-3">
                  <FaCheckCircle className="fas fa-2x me-2 text-primary mb-1" />
                  <h6 className="mb-0">Vote to help others</h6>
                </li>
              </ul>
              <Image
                width={493}
                height={662}
                src="/feature-img3.jpg"
                alt="feature image"
                className="img-fluid rounded-custom"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureImgContentTwo;
