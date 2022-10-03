/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import Link from 'next/link'
import Rating from '../common/Rating';
import SectionTitle from '../common/SectionTitle';
import { TestimonialData } from '../../utils/data';
import { Contract, providers, utils } from "ethers";
import Web3Modal from "web3modal";


const TestimonialTwo = ({ contractAddress,  abi, dark, bgWhite }) => {
  const [owner, setOwner] = useState("");
  // checks if the currently connected MetaMask wallet is the owner of the contract
  const [isOwner, setIsOwner] = useState(false);
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();

  useEffect(() => {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });
    }, []);

  
  /**
   * Returns a Provider or Signer object representing the Ethereum RPC with or without the
   * signing capabilities of metamask attached
   *
   * A `Provider` is needed to interact with the blockchain - reading transactions, reading balances, reading state, etc.
   *
   * A `Signer` is a special type of Provider used in case a `write` transaction needs to be made to the blockchain, which involves the connected account
   * needing to make a digital signature to authorize the transaction being sent. Metamask exposes a Signer API to allow your website to
   * request signatures from the user using Signer functions.
   *
   * @param {*} needSigner - True if you need the signer, default false otherwise
   */
   const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

      // If user is not connected to the Mumbai network, let them know and throw an error
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

  const getOwner = async () => {
    try {
      console.log(abi,contractAddress)
      // Get the provider from web3Modal, which in our case is MetaMask
      // No need for the Signer here, as we are only reading state from the blockchain
      const provider = await getProviderOrSigner();
      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      const projectContract = new Contract(contractAddress, abi, provider);
      // call the owner function from the contract
      const _owner = await projectContract.owner();
      if (_owner) setOwner(_owner)
      localStorage.setItem('owner',_owner)
      // We will get the signer now to extract the address of the currently connected MetaMask account
      const signer = await getProviderOrSigner(true);
      // Get the address associated to the signer which is connected to  MetaMask
      const address = await signer.getAddress();
      if (address.toLowerCase() === _owner.toLowerCase()) {
        setIsOwner(true);
        localStorage.setItem('isOwner',true)
      } else {
        console.log(address)
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  /*
      renderButton: Returns a button based on the state of the dapp
    */
  const renderButton = () => {
    return (
                    <Link href="#">
                        <a onClick={getOwner} className="btn btn-warning" >Get owner</a>
                    </Link>

          );
        
      };

  const swiperOption = {
    slidesPerView: 2,
    mousewheel: true,
    spaceBetween: 30,
    slidesPerGroup: 2,
    loop: true,
    navigation: {
      nextEl: '.swiper-nav-control .swiper-button-next',
      prevEl: '.swiper-nav-control .swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      1142: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    },
  };
  return (
    <>
      <section
        className={`testimonial-section ${dark ? 'bg-dark' : 'bg-light'
          } ptb-120 ${bgWhite ? 'bg-white' : ''}`}
      >
        <div className="container">
          <div className="row justify-content-center align-content-center">
            <div className="col-md-10 col-lg-6">
              {dark ? (
                <SectionTitle
                  subtitle="All projects"
                  title="Pick up a project and vote up or down about it"
                  darkBg
                  centerAlign
                />
              ) : (
                <SectionTitle
                  subtitle="Your projects"
                  title="List of your submitted projects"
                  description="By submitting a project your are buimding a safer web3 ecosystem for new entrants."
                  centerAlign
                />
              )}
            </div>
            {renderButton()}
          </div>
  
          <div className="row">
            <div className="col-12">
              <div className="position-relative">
                <Swiper {...swiperOption} modules={[Navigation]}>
                  {TestimonialData.map((data) => (
                    <SwiperSlide key={data.id}>
                      <div
                        className={`p-5 rounded-custom position-relative ${dark
                          ? 'bg-custom-light text-white'
                          : 'border border-2'
                          }   `}
                      >
                        <img
                          src="/testimonial/quotes-dot.svg"
                          alt="quotes"
                          width="100"
                          className="position-absolute left-0 top-0 z--1 p-3"
                        />
                        <div className="d-flex mb-32 align-items-center">
                          <Image
                            width={60}
                            height={60}
                            src={data.authorImg}
                            className="img-fluid rounded"
                            alt="user"
                          />
                          <div className="author-info ms-3">
                            <h6 className="mb-0">{data.authorName}</h6>
                            <small>{data.authorTitle}</small>
                          </div>
                        </div>
                        <blockquote>
                          <h6>{data.quoteTitle}</h6>
                          {data.authorQuote}
                        </blockquote>
                        <Rating />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="swiper-nav-control">
                  <span className="swiper-button-next"></span>
                  <span className="swiper-button-prev"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialTwo;
