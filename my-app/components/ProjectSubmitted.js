import React from 'react'

import {
    useAccount
} from "wagmi";

import { ethers } from "ethers";

import { VoteButton, SubmitButton } from './Button.js'

import { ProjectContractAddress, ProjectContractAbi } from '../constants'

console.log(ProjectContractAddress, ProjectContractAbi)

import styles from '../styles/ProjectSubmitted.module.css'

// function addProposal(
//     address contractAddress,
//     string memory url,
//     string memory name
// ) public {

export function ProjectToSubmit(props) {
    const [project, setProject] = React.useState({
        name: "Name of the project",
        address: "Contract Address",
        url: "url of the project"
    })

    const {
        data: addProposalData,
        write: addProposal,
        isLoading: isAddProposalLoading,
        isSuccess: isAddProposalSucceded,
        error: AddProposalError,
    } = useContractWrite({
        addressOrName: ProjectContractAddress,
        contractInterface: ProjectContractAbi,
        functionName: "addProposal",
    });



    async function submitProject() {
        console.log("pwett")
        await addProposal({ args: [project.address, project.url, project.name] })
        console.log("pwetttttttttttttt")
        // Check TX for mint function

    }


    React.useEffect(() => console.log(project), [project])

    return (
        <div className={styles.projectToSubmitContainer}>
            <div>
                <input
                    className={styles.input}
                    type="text"
                    id="name"
                    name="name"
                    value={project.name}
                    onChange={event => setProject(old => {
                        return {
                            ...old,
                            name: event.target.value
                        }
                    })}
                />
            </div>
            <div>
                <input
                    className={styles.input}
                    type="text"
                    id="address"
                    name="address"
                    value={project.address}
                    onChange={event => setProject(old => {
                        return {
                            ...old,
                            address: event.target.value
                        }
                    })}
                />
            </div>
            <div>
                <input
                    className={styles.input}
                    type="text"
                    id="url"
                    name="url"
                    value={project.url}
                    onChange={event => setProject(old => {
                        return {
                            ...old,
                            url: event.target.value
                        }
                    })}
                />
            </div>
            <SubmitButton text='Submit' onClick={submitProject} />
        </div>
    )
}

export function ProjectSubmitted(props) {
    return (
        <div className={styles.projectSubmittedContainer}>
            <a target="_blank" href={props.project.url} rel="noopener noreferrer">
                <div className={styles.name}>{props.project.name}</div>
            </a>
            <div className={styles.trustLevel}>{props.project.trustLevel}</div>
            <VoteButton text='Vote' />
        </div>
    )
}

