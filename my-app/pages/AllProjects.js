import React from "react"
import ProjectSubmitted from "../components/ProjectSubmitted"

import styles from "../styles/AllProjects.module.css"

export default function AllProjects() {

    function upvoteProject(projectId) {
        console.log(projectId)
    }

    const projects = [
        {
            id: "0xf23F410032feD9CE2780364562bed7F191B875a5",
            name: "Insane NFT Project Pookaboo",
            trustLevel: 37,
            url: "https://www.potential.scamcoin.project",

        },
        {
            id: "0x2E4EA1e199Cdd4F5a8EE1595165DA32A267C2359",
            name: "Luna, Do Kwon project",
            trustLevel: 7,
            url: "https://www.terra.money/",

        },
        {
            id: "0x8B5671F39635d6A6a79606Bf086FB4581ECC2596",
            name: "Celer Im.",
            trustLevel: 93,
            url: "https://www.celer.network/",

        },
        {
            id: "0x712F9d13C69F271bC70bB78C92cd012865668167",
            name: "A random web3 respectable project",
            trustLevel: 70,
            url: "https://www.respectable.project/",

        },
    ]

    const wrappedProjects = projects.map(project => {
        return <ProjectSubmitted key={project.id} project={project} upvote={() => upvoteProject(project.id)} />
    })

    return (
        <div className={styles.ProjectsContainer}>
            {wrappedProjects}
        </div>
    )
}

