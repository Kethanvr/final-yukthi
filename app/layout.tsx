import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context/AppContext";
import { MobileViewportHandler } from "@/components/MobileViewportHandler";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "InstaScan - Smart Product Safety Scanner",
  description: "Scan products to check safety for your family's health profile",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover", // For notched devices (iOS safe area)
  },
  themeColor: "#475569", // Slate-600
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "InstaScan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <MobileViewportHandler />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
