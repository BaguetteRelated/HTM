import React from "react"

import styles from '../styles/Button.module.css'

export function WelcomeButton(props) {
    return (
        <div className={styles.WelcomeButton}>{props.text}</div>
    )
}

export function VoteButton(props) {
    return (
        <div className={styles.VoteButton}>{props.text}</div>
    )
}