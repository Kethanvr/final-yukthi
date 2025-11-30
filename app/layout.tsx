import type { Metadata, Viewport } from "next";
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "InstaScan",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover", // For notched devices (iOS safe area)
  themeColor: "#3B82F6", // Blue-600
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
