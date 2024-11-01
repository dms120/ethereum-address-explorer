import Image from "next/image";
import { EvmNFT } from "./nft-list";
import { Suspense, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

const handleIPFS = (url: string) => (url.startsWith("ipfs://") ? url.replace("ipfs://", "https://ipfs.io/ipfs/") : url);

export default function NFT({ nft }: { nft: EvmNFT }) {
	const [imageError, setImageError] = useState(false);

	// Will ignore NFTs without image metadata
	if (!nft.metadata.image) {
		return;
	}
	return (
		<div className="flex flex-col items-center">
			<div className="mb-2 font-bold">{nft.name}</div>

			{imageError ? (
				<Alert
					className="w-[200px] h-[200px] content-center align-middle text-center"
					variant="destructive"
				>
					<AlertDescription>Error loading NFT </AlertDescription>
				</Alert>
			) : (
				<Suspense fallback={<Skeleton className="rounded-md w-[300px] h-[300px]" />}>
					<Image
						draggable={false}
						className="rounded-md"
						src={handleIPFS(nft.metadata.image)}
						alt="Exchange Logo"
						width={0}
						height={0}
						sizes="100vw"
						style={{ width: "100%", height: "auto" }}
						onError={() => setImageError(true)}
					/>
				</Suspense>
			)}
		</div>
	);
}
