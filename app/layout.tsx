import AdminAuthContextProvider from "./context/AdminAuthContextrPovider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Abdullah_Portfolio",
	description: "Odulate Abdullah's Portfolio",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AdminAuthContextProvider>{children}</AdminAuthContextProvider>
			</body>
		</html>
	);
}
