import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const proximaNova = localFont({
    src: [
        {
            path: "./fonts/proximanova-regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "./fonts/proximanova-medium.otf",
            weight: "500",
            style: "normal",
        },
        {
            path: "./fonts/proximanova-bold.otf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-proxima-nova",
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
            <body className={`${proximaNova.variable} antialiased`}>
                <main className="font-sans">{children}</main>
            </body>
        </html>
    );
}
