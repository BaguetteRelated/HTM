import React from 'react'

import Header from './Header'

import styles from "../styles/Layout.module.css"

export default function Layout({ children }) {
    return (
        <>
            <div className={styles.appContainer}>
                <div className={styles.appContainer2}>
                    <Header />
                    <main>{children}</main>
                </div>
            </div>
        </>

    )
}