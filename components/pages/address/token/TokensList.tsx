import { EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";
import { useEffect, useState } from "react";
import Token from "./Token";

interface AddressParams {
  address: string;
}

export interface EvmToken {
  name: string;
  symbol: string;
  decimals: number;
  tokenAddress: string;
  thumbnail: string;
  amount: number;
  balanceFormatted: string;
}

export default function TokensList({ address }: AddressParams) {
  const [tokens, setTokens] = useState<EvmToken[]>([]);
  useEffect(() => {
    const fetchTokens = async () => {
      const chain = EvmChain.ETHEREUM;

      const response = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice(
        {
          address,
          chain,
        }
      );

      setTokens(response.result as []);
      console.log("Tokens", response.result);
    };
    fetchTokens();
  }, [address]);
  return (
    <div className="mx-auto w-full my-4">
      <div>
        <div className="mt-4 flex items-center">
          <span className="text-xl font-bold text-mmBlack">Tokens</span>
        </div>
        <div className="mt-4">
          <div className="flex-grow">
            <div className="w-full bg-white overflow-hidden rounded-2xl cursor-pointer sm:w-[732px]">
              <div className="flex flex-col space-y-4 px-4 py-4 sm:px-6 sm:py-4">
                <div className="flex flex-wrap">
                  {tokens.map((token, index) => (
                    <Token token={token} key={index} index={index} />
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
