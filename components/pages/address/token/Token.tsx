import { useState } from "react";
import { EvmToken } from "./TokensList";
import Image from "next/image";

const formatAmountFromFloat = (amount: string): string => {
  const roundedAmount = parseFloat(amount);
  if (roundedAmount < 0.000001) {
    return "≈0.00";
  }

  const rounderAmountString = roundedAmount.toFixed(6);
  return parseFloat(rounderAmountString).toString();
};

export default function Token({
  token,
  index,
}: {
  token: EvmToken;
  index: number;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      key={token.tokenAddress}
      className={`my-2 mr-2 ${index > 6 ? "hidden" : "flex"}`}
    >
      <div className="mx-1">
        {token.thumbnail && !imageError ? (
          <Image
            draggable={false}
            className="rounded-full"
            src={token.thumbnail}
            alt="Exchange Logo"
            width={24}
            height={24}
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className={`flex h-[24px] w-[24px] items-center justify-center rounded-full border-2 border-mmLightGray bg-mmXLightGray`}
          >
            <p className={`select-none text-[12px] font-bold text-mmBlack`}>
              {token.name[0].toUpperCase()}
            </p>
          </div>
        )}
      </div>

      <span className="mx-0.5 text-sm">
        {Number(token.balanceFormatted).toPrecision(6)} {token.symbol}
      </span>
    </div>
  );
}
