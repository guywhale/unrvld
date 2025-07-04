import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
    subsets: ["latin"],
    variable: "--font-nunito-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: "UNRVLD Task",
    description: "Interview task for UNRVLD",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${nunitoSans.variable} antialiased`}>
                <main className="font-sans">{children}</main>
            </body>
        </html>
    );
}
