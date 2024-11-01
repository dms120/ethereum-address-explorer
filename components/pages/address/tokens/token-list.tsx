import { useEffect, useMemo, useState } from "react";
import Token from "./token";
import { Skeleton } from "@/components/ui/skeleton";
import { getUSDBalance } from "@/lib/utils";
import { getWalletTokenBalancesPrice } from "@/app/actions";

export interface EvmToken {
	name: string;
	symbol: string;
	decimals: number;
	tokenAddress: string;
	thumbnail: string;
	amount: number;
	balanceFormatted: string;
	usdValue: number;
}

interface AddressParams {
	address: string;
}

export default function TokensList({ address }: AddressParams) {
	const [tokens, setTokens] = useState<EvmToken[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const balance = useMemo(() => {
		const usdBalance = getUSDBalance(tokens);
		const formattedBalance = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
			usdBalance
		);
		return formattedBalance;
	}, [tokens]);

	useEffect(() => {
		if (!address) {
			return;
		}

		const fetchTokens = async () => {
			const result = await getWalletTokenBalancesPrice(address);

			setTokens(result as unknown as EvmToken[]);
			setIsLoading(false);
		};
		fetchTokens();
	}, [address]);

	return (
		<div className="w-full sm:w-2/4">
			<div className="mt-4 ">
				<span className="text-xl font-bold">Tokens</span>
			</div>

			<div className="mt-4">
				{isLoading ? (
					<Skeleton className="w-full h-[400px] rounded-2xl" />
				) : (
					<div className="w-full bg-slate-200	dark:bg-slate-800 overflow-hidden rounded-2xl ">
						<div className="flex flex-col space-y-4 px-4 py-4 sm:px-6 sm:py-4">
							<div>
								<span className="text-lg font-bold text-mmBlack">Balance: </span>
								{balance}
							</div>
							<span className="h-[2px] w-full bg-black dark:bg-[#f2f4f6]"></span>

							<div className="flex flex-wrap">
								{tokens.map((token, index) => (
									<Token token={token} key={index} index={index} />
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
