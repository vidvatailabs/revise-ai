import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { PWARegister } from "@/components/pwa-register";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Revise AI — Smart Exam Revision, Powered by AI",
  description:
    "Revise AI turns your syllabus into smart, personalised revision sessions. Focus on what matters, retain more, and ace every exam.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Revise AI",
  },
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#6366f1",
          colorBackground: "#0f1629",
          colorText: "#e2e8f0",
          colorInputBackground: "#1e293b",
          colorInputText: "#e2e8f0",
        },
      }}
    >
      <html lang="en" className="dark">
        <head>
          <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        </head>
        <body className={inter.className}>
          {children}
          <PWARegister />
        </body>
      </html>
    </ClerkProvider>
  );
}
