import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/app-header";
import { ErrorBoundary } from "@/components/error-boundary";
import { AppProviders } from "@/providers/app-providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "GreatFrontEnd Portfolio",
	description:
		"Interview solutions for GFE75 and Blind75 in React + TypeScript",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="bg-background">
			<head>
				<style
					dangerouslySetInnerHTML={{
						__html: `@media(prefers-color-scheme:dark){html,body{background-color:#0a0a0a}}@media(prefers-color-scheme:light){html,body{background-color:#fff}}`,
					}}
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-background antialiased`}
			>
				<AppProviders>
					<div className="flex min-h-screen flex-1 flex-col">
						<AppHeader />
						<div className="flex flex-1 flex-col">
							<ErrorBoundary>
								<main className="flex min-h-full flex-1 flex-col overflow-x-hidden bg-background px-10 py-6 sm:px-14 md:px-20 lg:px-24 xl:px-32">
									{children}
								</main>
							</ErrorBoundary>
						</div>
					</div>
				</AppProviders>
			</body>
		</html>
	);
}
