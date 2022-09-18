import React from 'react'

import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from 'wagmi'

import { VoteButton, SubmitButton } from './Button.js'

import { ProjectContractAddress, ProjectContractAbi } from '../constants'

import styles from '../styles/ProjectSubmitted.module.css'

export function ProjectToSubmit(props) {
    const [project, setProject] = React.useState({
        name: "",
        address: "",
        url: ""
    })

    const { config } = usePrepareContractWrite({
        addressOrName: ProjectContractAddress,
        contractInterface: ProjectContractAbi,
        functionName: 'addProposal',
        args: [project.address, project.url, project.name]
    })

    console.log("config : ", config)
    const { data, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })
    console.log(" write, data : ", write, data)

    async function submitProject() {
        write()
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

