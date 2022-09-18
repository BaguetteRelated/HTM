import * as React from 'react'


import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from 'wagmi'

import { ProjectContractAddress, ProjectContractAbi } from '../constants'

export function ProjectToSubmit(props) {
    const project = {
        name: "Name of the project",
        address: "0x7BC2E270b6C8D215A39f46e871Cd3a6499ca81c8",
        url: "url of the project"
    }
    // address url name
    const { config } = usePrepareContractWrite({
        addressOrName: ProjectContractAddress,
        contractInterface: ProjectContractAbi,
        functionName: 'addProposal',
        args: [project.address, project.url, project.name]
    })

    console.log("config : ", config)
    // console.log("après config")
    const { data, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })
    console.log(" write, data : ", write, data)

    return (
        <div onClick={() => write?.()}>Submit</div>
    )
}


