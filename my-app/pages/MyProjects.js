import React from "react"

import styles from "../styles/MyProjects.module.css"

import { ProjectToSubmit } from "../components/ProjectSubmitted"

export default function MyProjects() {
    return (
        <div className={styles.MyProjectsContainer}>
            <ProjectToSubmit />
        </div>
    )
}