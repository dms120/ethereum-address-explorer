"use client";

import { useParams, useRouter } from "next/navigation";
import NFTList from "../../components/pages/address/nft/NFTList";
import TokensList from "../../components/pages/address/token/TokensList";
import { useEffect, useState } from "react";
import Moralis from "moralis";

interface AddressPageParams {
  params: {
    address: string;
  };
}

export const isENSAddress = (address: string) => {
  return address.endsWith(".eth");
};

export default function AddressPage(props: AddressPageParams) {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState(params.address as string);

  useEffect(() => {
    const run = async () => {
      if (!Moralis.Core.isStarted) {
        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        });
      }

      if (isENSAddress(params.address as string)) {
        const response = await Moralis.EvmApi.resolve.resolveENSDomain({
          domain: params.address as string,
        });
        console.log("ens response", response?.toJSON());
        const json = response?.toJSON();
        if (json?.address) {
          setAddress(json?.address);
        } else {
          return;
          // TODO: Handle error
        }
      }

      setIsLoading(false);
    };
    run();
  }, []);

  // TODO: Validate address format!!

  if (isLoading) {
    return <div>TODO LOADING</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 ">
      <TokensList address={address} />
      <NFTList address={address} />
    </div>
  );
}
