import { EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";
import { useEffect, useState } from "react";
import NFT from "./NFT";

interface AddressParams {
  address: string;
}

export interface EvmNFT {
  name: string;
  symbol: string;
  decimals: number;
  tokenAddress: string;
  thumbnail: string;
  amount: number;
  metadata: string;
}

export default function NFTList({ address }: AddressParams) {
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    const fetchNFTs = async () => {
      const chain = EvmChain.ETHEREUM;

      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
      });

      const list = response.toJSON().result;

      setNfts(list as unknown as []);
      console.log("NFTs", list);
    };
    fetchNFTs();
  }, [address]);
  return (
    <div className="mx-auto w-full my-4">
      <div>
        <div className="mt-4 flex items-center">
          <span className="text-xl font-bold text-mmBlack">NFTs</span>
        </div>
        <div className="mt-4">
          <div className="flex-grow">
            <div className="w-full bg-white overflow-hidden rounded-2xl cursor-pointer sm:w-[732px]">
              <div className="flex flex-col space-y-4 px-4 py-4 sm:px-6 sm:py-4">
                <div className="flex flex-wrap">
                  {nfts.map((nft, index) => (
                    <NFT nft={nft} key={index} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
