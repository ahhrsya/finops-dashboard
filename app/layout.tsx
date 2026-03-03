import type { Metadata } from "next";
import { Inter, Syne, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "../styles/globals.css";
import { AppShell } from "@/components/app-shell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({
    subsets: ["latin"],
    weight: ["600", "700", "800"],
    variable: "--font-syne"
});
const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500"],
    variable: "--font-dm-sans"
});
const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-ibm-plex-mono"
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
            <body className={`${dmSans.variable} ${syne.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
                <AppShell>
                    {children}
                </AppShell>
            </body>
        </html>
    );
}
