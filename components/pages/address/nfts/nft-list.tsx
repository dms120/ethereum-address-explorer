import { useEffect, useState } from "react";
import NFT from "./nft";
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { getWalletNFTs } from "@/app/actions";
import { Frown } from "lucide-react";

interface AddressParams {
	address: string;
}

interface NFTMetadata {
	image: string;
	description: string;
}

export interface EvmNFT {
	name: string;

	metadata: NFTMetadata;
}

export default function NFTList({ address }: AddressParams) {
	const [nfts, setNfts] = useState<EvmNFT[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Carousel
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!address) {
			return;
		}

		const fetchNFTs = async () => {
			const list = await getWalletNFTs(address);

			const parsedList = list
				.filter((n) => !n.possible_spam && n.metadata)
				.map((m) => {
					return {
						...m,
						metadata: m.metadata ? JSON.parse(m.metadata) : {},
					};
				});

			setNfts(parsedList as unknown as []);
			setIsLoading(false);
		};
		fetchNFTs();
	}, [address]);

	useEffect(() => {
		if (!api || !nfts.length) {
			return;
		}

		setCount(nfts.length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api, nfts]);

	return (
		<div className="w-full sm:w-2/4">
			<div className="mt-4 flex items-center">
				<span className="text-xl font-bold">NFTs</span>
			</div>

			<div className="mt-4">
				{isLoading ? (
					<Skeleton className="w-full h-[400px] rounded-2xl" />
				) : (
					<div className="min-w-full bg-slate-200 dark:bg-slate-800  overflow-hidden rounded-2xl">
						<div className="items-center space-y-1 px-4 py-4 sm:px-6 sm:py-4 mx-auto max-w-xs xl:max-w-sm">
							{nfts.length ? (
								<>
									<div className="py-2 text-center text-sm text-muted-foreground">
										NFT {current} of {count}
									</div>
									<Carousel setApi={setApi} className="w-full">
										<CarouselContent>
											{nfts.map((nft: EvmNFT, index) => (
												<CarouselItem key={index}>
													<NFT nft={nft} key={index} />
												</CarouselItem>
											))}
										</CarouselContent>
										<CarouselPrevious />
										<CarouselNext />
									</Carousel>
								</>
							) : (
								<div className=" flex flex-row items-center justify-center gap-4 md:h-24 ">
									You have no NFTs <Frown />
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
