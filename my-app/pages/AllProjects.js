import React from "react"
import { ProjectSubmitted } from "../components/ProjectSubmitted"

import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useContractRead ,
} from 'wagmi'

import styles from "../styles/AllProjects.module.css"

import { ProjectContractAddress, ProjectContractAbi } from '../constants'

export function GetProposal() {
    const { data, error } = useContractRead({
        addressOrName: ProjectContractAddress,
        contractInterface: ProjectContractAbi,
        functionName: 'proposalCount'
    })
  
    return (
      <div>
        <p>{data}</p>
      </div>
    )
  }

export default function AllProjects() {


    const { data, error } = useContractRead({
        addressOrName: ProjectContractAddress,
        contractInterface: ProjectContractAbi,
        functionName: 'proposalCount'
    })

    console.log(" data : ", data)

    function upvoteProject(projectId) {
        // console.log(projectId)
    }

    React.useEffect(() => {
        console.log(data)
    }
        , [])

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
            <GetProposal/>
            {wrappedProjects}
        </div>

    )
}

