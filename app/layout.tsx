import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ContextProvider from "@/context";
import { headers } from "next/headers"; // added
import { ThemeProvider } from "@/components/themeProvider";
import { SiteHeader } from "@/components/header";
import { SiteFooter } from "@/components/footer";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Ethereum Address Explores",
	description: "Reown challenge",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookies = (await headers()).get("cookie");

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<ContextProvider cookies={cookies}>
						<SiteHeader />
						{children}
						<SiteFooter />
					</ContextProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
