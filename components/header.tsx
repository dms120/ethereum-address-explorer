import Logo from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
	return (
		<header className="px-2 top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 max-w-screen-2xl items-center flex-col sm:flex-row">
				<Logo />
				<div className="flex flex-1 items-center justify-end space-x-2 ">
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
