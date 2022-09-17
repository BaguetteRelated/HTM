import React from "react"
import Link from 'next/link'
import styles from '../styles/Header.module.css'

import '@rainbow-me/rainbowkit/styles.css';

function Home() {
    return (
        <div className={styles.homeContainer}>
            <Link href="/">
                <a>Home</a>
            </Link>
        </div>
    )
}

function Menu() {
    return (
        <div className={styles.menuContainer}>
            <div className={styles.menuItem}>
                <Link href="/Projects">
                    <a >My projects</a>
                </Link>
            </div>
            <div className={styles.menuItem}>
                <Link href="/Supports">
                    <a >My supports</a>
                </Link>
            </div>
            <div className={styles.menuItemEnd}>
                <Link href="/Profile">
                    <a >My profile</a>
                </Link>
            </div>
        </div>
    )
}

function Search() {
    return (
        <div className={styles.searchContainer}>
            <input class={styles.searchInput} type="text" placeholder="Search" />
        </div>
    )
}

export default function Header() {
    return (
        <div className={styles.headerContainer}>
            <Home />
            <Menu />
            <Search />
        </div>
    )
}

