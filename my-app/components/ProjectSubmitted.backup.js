import React from 'react'

import { useContract, useSigner } from 'wagmi'

import { ethers } from "ethers"

import { VoteButton, SubmitButton } from './Button.js'

import { ProjectContractAddress, ProjectContractAbi } from '../constants'

import { ConnectButton } from '@rainbow-me/rainbowkit';

import styles from '../styles/ProjectSubmitted.module.css'

// function addProposal(
//     address contractAddress,
//     string memory url,
//     string memory name
// ) public {

export function ProjectToSubmit(props) {
    const [project, setProject] = React.useState({
        name: "Name of the project",
        address: "0x7BC2E270b6C8D215A39f46e871Cd3a6499ca81c8",
        url: "url of the project"
    })

    const signer = useSigner();
    console.log("signer : ", signer)



    async function submitProject() {
        console.log("pwett")

        const contract = useContract({
            addressOrName: ProjectContractAddress,
            contractInterface: ProjectContractAbi,
            signerOrProvider: signer.data,
        })
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

