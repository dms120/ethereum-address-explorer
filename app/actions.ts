"use server";

import { EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";

export async function initializeAPI() {
  if (!Moralis.Core.isStarted) {
    console.debug("Moralis will start");
    await Moralis.start({
      apiKey: process.env.NEXT_MORALIS_API_KEY,
    });
    console.debug("Moralis had started");
  }
}

export async function resolveENSDomain(address: string) {
  console.debug("resolveENSDomain");
  const response = await Moralis.EvmApi.resolve.resolveENSDomain({
    domain: address,
  });

  const json = response?.toJSON();
  return json?.address;
}

export async function getWalletNFTs(address: string) {
  console.debug("getWalletNFTs");
  const chain = EvmChain.ETHEREUM;
  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain,
  });
  const list = response.toJSON().result;
  return list;
}

export async function getWalletTokenBalancesPrice(address: string) {
  console.debug("getWalletTokenBalancesPrice");

  const chain = EvmChain.ETHEREUM;
  const { response } = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice(
    {
      address,
      chain,
    }
  );

  return response.toJSON().result;
}
