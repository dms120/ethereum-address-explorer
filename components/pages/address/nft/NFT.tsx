import { EvmNFT } from "./NFTList";

export default function NFT({ nft, index }: { nft: EvmNFT; index: number }) {
  return <div>{nft.name}</div>;
}
