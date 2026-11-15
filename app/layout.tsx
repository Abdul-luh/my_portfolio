import AdminAuthContextProvider from "./context/AdminAuth/AdminAuthContextrPovider";
import "./globals.css";

export const metadata = {
  title: "Abdullah Odulate | Frontend & Full-Stack Developer",
  description: "Portfolio of Abdullah Odulate - Modern Web Applications, React, Next.js, and Full-Stack Engineering.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AdminAuthContextProvider>{children}</AdminAuthContextProvider>
      </body>
    </html>
  );
}
