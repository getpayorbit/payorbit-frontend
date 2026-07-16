import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
});

const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "PayOrbit — Instant Global Payroll",
	description:
		"Global payroll shouldn't take days. PayOrbit enables companies to pay global teams instantly using stablecoins on Stellar. No delays. No borders. No high fees.",
	keywords: [
		"payroll",
		"cross-border payments",
		"global payments",
		"blockchain",
		"stellar",
		"stablecoin payroll",
		"USDC payroll",
	],
	openGraph: {
		title: "PayOrbit — Instant Global Payroll",
		description:
			"Pay your global team instantly using stablecoins on Stellar. No delays. No borders. No high fees.",
		type: "website",
	},
	icons: {
		icon: [
			{ url: "/favicon-16x16.png", media: "(prefers-color-scheme: light)" },
			{ url: "/favicon-32x32.png", media: "(prefers-color-scheme: light)" },
			{ url: "/favicon.ico", type: "image/svg+xml" },
		],
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.variable} ${dmSans.variable} antialiased`}
			>
				<Providers>{children}</Providers>
				<Analytics />
			</body>
		</html>
	);
}
