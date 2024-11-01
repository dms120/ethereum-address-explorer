import Ethereum from "./ethereum-icon";

export default function Logo() {
	return (
		<h1 className="m-1 flex text-2xl font-bold">
			<Ethereum />
			<div className="m-1">Address Explorer</div>
			<Ethereum />
		</h1>
	);
}
