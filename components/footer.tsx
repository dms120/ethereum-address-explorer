import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export function SiteFooter() {
	return (
		<footer className="py-6 md:px-8 md:py-0">
			<div className="container min-w-full flex flex-row items-center justify-center gap-4 md:h-24 ">
				<Link
					href={"https://www.linkedin.com/in/david-sampaio-374ab9107/"}
					target="_blank"
					rel="noreferrer"
				>
					<div
						className={cn(
							buttonVariants({
								variant: "ghost",
							}),
							"h-8 w-8 px-0"
						)}
					>
						<LinkedInLogoIcon />
						<span className="sr-only">Linkedin</span>
					</div>
				</Link>
				<Link href={"https://github.com/dms120"} target="_blank" rel="noreferrer">
					<div
						className={cn(
							buttonVariants({
								variant: "ghost",
							}),
							"h-8 w-8 px-0"
						)}
					>
						<GitHubLogoIcon />
						<span className="sr-only">Github</span>
					</div>
				</Link>
			</div>
		</footer>
	);
}
