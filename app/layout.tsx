import AdminAuthContextProvider from "./context/AdminAuth/AdminAuthContextrPovider";
import "./globals.css";
import { Inter } from "next/font/google";
import { ReduxProvider } from "./redux/reduxProvider";

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
				<ReduxProvider>
					<AdminAuthContextProvider>{children}</AdminAuthContextProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
