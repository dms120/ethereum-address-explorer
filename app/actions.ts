'use server'

import { EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";

export async function initializeAPI() {
    if (!Moralis.Core.isStarted) {
        await Moralis.start({
            apiKey: process.env.NEXT_MORALIS_API_KEY,
        });
    }
}

export async function resolveENSDomain(address: string) {
    const response = await Moralis.EvmApi.resolve.resolveENSDomain({
        domain: address,
    });

    const json = response?.toJSON();
    return json?.address
}

export async function getWalletNFTs(address: string) {
    const chain = EvmChain.ETHEREUM;
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
    });
    const list = response.toJSON().result;
    return list
}

export async function getWalletTokenBalancesPrice(address: string) {
    const chain = EvmChain.ETHEREUM;
    const { response } = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
        address,
        chain,
    });

    return response.toJSON().result
}