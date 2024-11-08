/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../components/ui/form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAppKitAccount } from "@reown/appkit/react";

const formSchema = z.object({
	walletAddress: z
		.string()
		.min(1, {
			message: "Please fill the address",
		})
		.regex(/^(0x)?[0-9a-fA-F]{40}$|.+(\.[eE][tT][hH])$/, {
			message: "Please enter a valid Ethereum address",
		}),
});

export default function Home() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { address } = useAppKitAccount();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			walletAddress: "",
		},
	});

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		setLoading(true);
		router.push(`/${values.walletAddress}`);
	};

	useEffect(() => {
		if (address) {
			router.push(`/${address}`);
		}
	}, [address]);

	return (
		<div className="h-[calc(100vh-152px)] flex flex-col items-center justify-center ">
			<Card
				className={cn(
					"w-11/12 sm:w-[480px] m-2 sm:m-0  p-4 flex flex-col items-center justify-center space-y-5"
				)}
			>
				<h1 className="flex text-xl font-bold text-center ">Connect wallet to explore</h1>
				<w3m-button balance="hide" />
				<span className="flex items-center justify-start gap-2 w-full">
					<span className="h-[2px] w-full bg-[#f2f4f6]"></span>
					<p className=" text-mmGray uppercase">or</p>
					<span className="h-[2px] w-full bg-[#f2f4f6]"></span>
				</span>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="flex w-full sm:w-auto space-x-2 flex-col sm:flex-row gap-3 sm:gap-0 items-center"
					>
						<FormField
							control={form.control}
							name="walletAddress"
							render={({ field }) => (
								<FormItem className="w-full flex flex-col  flex-wrap text-center content-center">
									<FormControl>
										<Input
											className="w-full sm:w-[250px] max-w-[250px]"
											placeholder="Enter an Ethereum address or ENS"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							disabled={loading}
							type="submit"
							className="rounded-full font-bold dark:text-white max-w-fit"
						>
							{loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin " /> : "Explore"}
						</Button>
					</form>
				</Form>
			</Card>
		</div>
	);
}
