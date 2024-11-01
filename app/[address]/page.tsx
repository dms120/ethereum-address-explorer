"use client";

import { useParams, useRouter } from "next/navigation";
import NFTList from "../../components/pages/address/nfts/nft-list";
import TokensList from "../../components/pages/address/tokens/token-list";
import { useEffect, useState } from "react";
import Moralis from "moralis";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useDisconnect } from "@reown/appkit/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { isENSAddress, isValidAddress } from "@/lib/utils";

export default function AddressPage() {
	const params = useParams();
	const router = useRouter();
	const { disconnect } = useDisconnect();

	const [address, setAddress] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		if (!isValidAddress(params.address as string)) {
			setError("Your endress is not valid");
			return;
		}

		const initialize = async () => {
			if (!Moralis.Core.isStarted) {
				await Moralis.start({
					apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
				});
			}

			if (!isENSAddress(params.address as string)) {
				setAddress(params.address as string);
				return;
			}

			// Try to resolve ENS
			try {
				const response = await Moralis.EvmApi.resolve.resolveENSDomain({
					domain: params.address as string,
				});
				const json = response?.toJSON();
				if (json?.address) {
					setAddress(json?.address);
				} else {
					setError("Your ENS cannot be resolved");
				}
			} catch (error) {
				setError("Your ENS cannot be resolved");
			}
		};
		initialize();
	}, []);

	const resetWallet = () => {
		disconnect();
		router.push("/");
	};

	if (error) {
		return (
			<div className="mx-2 max-w-7xl">
				<Alert variant="destructive">
					<ExclamationTriangleIcon className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			</div>
		);
	}

	return (
		<div className=" flex flex-col items-center p-4 mt-7 sm:mt-2 gap-2">
			<div className="text-center text-xl text-muted-foreground">Wallet</div>
			<div className="flex items-center space-x-0 sm:space-x-4 flex-col sm:flex-row gap-1 sm:gap-0">
				<div className="hidden sm:inline-flex ">
					{address ? (
						<Jazzicon diameter={30} seed={jsNumberForAddress(address)} />
					) : (
						<Skeleton className="h-[30px] w-[30px] rounded-full" />
					)}
				</div>
				{address ? <h3>{address}</h3> : <Skeleton className="h-[20px] w-[385px]" />}

				<Button
					disabled={!address}
					variant="outline"
					size="icon"
					className="rounded-full"
					onClick={resetWallet}
				>
					<X className="h-4 w-4 text-red-500	" />
				</Button>
			</div>
			<div className="w-full flex gap-2 flex-col sm:flex-row">
				<TokensList address={address} />
				<NFTList address={address} />
			</div>
		</div>
	);
}
