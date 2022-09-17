import Head from 'next/head'
import Image from 'next/image'

import { WelcomeButton } from '../components/Button.js'
import Link from 'next/link'

import styles from '../styles/Home.module.css'

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.welcomeDiv}>
        <h1>Create or Support</h1>
        <div className={styles.tagline}>
          Do you have a project that you care ?
        </div>
        <div className={styles.tagline}>
          Or just willing to send your love to one ?
        </div>
        <div className={styles.buttonContainer}>
          <Link href="/AllProjects">
            <a>
              <WelcomeButton text='Vote' />
            </a>
          </Link>
          <Link href="/MyProjects">
            <a>
              <WelcomeButton text='Submit a project' />
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.welcomeImg}>
        <img className={styles.img} src='trust_small.jpeg' />
      </div>
      {/* main page
      <ConnectButton /> */}
    </div >

  )
}
