import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { AppShell } from "@/components/app-shell";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: 'swap',
});

export const metadata: Metadata = {
    title: "FinOps Dashboard",
    description: "App — Cost Alerts, Budget Caps, Anomaly Detection",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} font-sans antialiased text-foreground bg-black`}>
                <AppShell>
                    {children}
                </AppShell>
            </body>
        </html>
    );
}
