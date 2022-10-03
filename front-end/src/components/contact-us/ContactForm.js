import React, { useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import Link from 'next/link'
import { Contract, providers, utils } from "ethers";
import Web3Modal from "web3modal";

const ContactForm = ({contractAddress, abi}) => {
  const [owner, setOwner] = useState("");
  // checks if the currently connected MetaMask wallet is the owner of the contract
  const [isOwner, setIsOwner] = useState(false);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();

  const [project, setProject] = useState({
    name: "",
    address: "",
    url: ""
  })

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
      console.log("Owner :"+ _owner)
      // We will get the signer now to extract the address of the currently connected MetaMask account
      const signer = await getProviderOrSigner(true);
      // Get the address associated to the signer which is connected to  MetaMask
      const address = await signer.getAddress();
      if (address.toLowerCase() === _owner.toLowerCase()) {
        setIsOwner(true);
        localStorage.setItem('isOwner',true)
      } else {
        console.log("me :"+ address)
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const submitProject = async () => {
    try {
      // We need a Signer here since this is a 'write' transaction.
      const signer = await getProviderOrSigner(true);
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const projectContract = new Contract(
        contractAddress,
        abi,
        signer
      );
      // call the startPresale from the contract
      const tx = await projectContract.addProposal(project.address, project.url, project.name);
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);

    } catch (err) {
      console.error(err);
    }

  };

  /*
      renderButton: Returns a button based on the state of the dapp
    */
  const renderButton = () => {

    if (loading) {
      return (
        <Link href="#">
          <a onClick={submitProject} className="btn rounded-pill btn-primary me-3 disabled" >Loading...</a>
        </Link>
      )
    } else {
      return (
                      <Link href="#">
                          <a onClick={submitProject} className="btn rounded-pill btn-primary me-3" >Submit your project</a>
                      </Link>

            );
          
        };
    }


  return (
    <section
      className="contact-us-form ptb-120"
      style={{
        background: "url('/shape/contact-us-bg.svg')no-repeat center bottom",
      }}
    >
      <div className="container">
        <div className="row justify-content-lg-between align-items-center">
          <div className="col-lg-6 col-md-8">
            <div className="section-heading">
              <h2>Share with us a project you know safe for us</h2>
              <p>
                The rule is simple. You share the contract address, project name and url.
                Then let the community be the judge.
              </p>
            </div>
            <div className="register-form">
              <div className="row">
                <div className="col-sm-12">
                  <label htmlFor="firstName" className="mb-1">
                    Project name <span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={project.name}
                      required
                      placeholder="Awesome name"
                      aria-label="Project name"
                      onChange={event => setProject(old => {
                        return {
                            ...old,
                            name: event.target.value
                        }
                    })}
                    />
                  </div>
                </div>
                <div className="col-sm-12">
                  <label htmlFor="phone" className="mb-1">
                    Contract address <span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      value={project.address}
                      required
                      placeholder="0x19D67dBE3018E2565A7b17Fe7F673770BC95a3FF"
                      aria-label="Contract address"
                      onChange={event => setProject(old => {
                        return {
                            ...old,
                            address: event.target.value
                        }
                    })}
                    />
                  </div>
                </div>
                <div className="col-sm-12">
                  <label htmlFor="email" className="mb-1">
                  Project url<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="url"
                      value={project.url}
                      required
                      placeholder="www.awesome_url.com"
                      aria-label="Project url"
                      onChange={event => setProject(old => {
                          return {
                              ...old,
                              url: event.target.value
                          }
                      })}
                    />
                  </div>
                </div>
              </div>
              {renderButton()}
            </div>
          </div>
          <div className="col-lg-5 col-md-10">
            <div className="contact-us-img">
              <Image
                width={526}
                height={406}
                src="/contact-us-img-2.svg"
                alt="contact us"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
