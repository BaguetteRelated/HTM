import React from "react"

import styles from '../styles/Header.module.css'

import '@rainbow-me/rainbowkit/styles.css';

import {
    getDefaultWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
    chain,
    configureChains,
    createClient,
    WagmiConfig,
} from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
    [chain.polygonMumbai],
    [
        jsonRpcProvider({
            priority: 0,
            rpc: (chain) => ({
                http: `https://polygon-mumbai.gateway.pokt.network/v1/lb/63256464708ade00392c6754`,
            }),
        })
    ]
);

const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})


export default function Header() {
    return (
        <div>
            header
        </div>
    )
}