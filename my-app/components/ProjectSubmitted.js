import React from 'react'

import styles from '../styles/ProjectSubmitted.module.css'

export default function ProjectSubmitted(props) {
    return (
        <div className={styles.projectContainer}>
            <a target="_blank" href={props.project.url} rel="noopener noreferrer">
                <div className={styles.name}>{props.project.name}</div>
            </a>
            <div className={styles.trustLevel}>{props.project.trustLevel}</div>
            <div className={styles.voteButton}>Vote</div>
        </div>
    )
}

