import React from "react"

import styles from '../styles/Button.module.css'

export default function Button(props) {
    return (
        <div className={styles.buttonPan}>{props.text}</div>
    )
}