import { useState } from "react";
import { EvmToken } from "./token-list";
import Image from "next/image";

export default function Token({ token, index }: { token: EvmToken; index: number }) {
	const [imageError, setImageError] = useState(false);

	return (
		<div key={token.tokenAddress} className={`my-2 mr-2 ${index > 6 ? "hidden" : "flex"}`}>
			<div className="mx-1">
				{token.thumbnail && !imageError ? (
					<Image
						draggable={false}
						className="rounded-full"
						src={token.thumbnail}
						alt="Exchange Logo"
						width={30}
						height={30}
						onError={() => setImageError(true)}
					/>
				) : (
					<div
						className={`flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-black dark:border-white`}
					>
						<p className={`select-none text-[12px] font-bold`}>{token.name[0].toUpperCase()}</p>
					</div>
				)}
			</div>

			<span className="mx-0.5 text-md">
				{Number(token.balanceFormatted).toPrecision(6)} {token.symbol}
			</span>
		</div>
	);
}
