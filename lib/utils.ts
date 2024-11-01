import { EvmToken } from "@/components/pages/address/tokens/token-list";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getUSDBalance = (tokens: EvmToken[]) => tokens.reduce((total: number, obj: EvmToken) => obj.usd_value + total, 0);

export const isENSAddress = (address: string) => {
    return address.endsWith(".eth");
};

export const isValidAddress = (address: string) => {
    return /^(0x)?[0-9a-fA-F]{40}$|.+(\.[eE][tT][hH])$/.test(address);
};
