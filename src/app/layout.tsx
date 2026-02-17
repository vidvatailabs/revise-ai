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
  openGraph: {
    title: "Revise AI — Smart Exam Revision, Powered by AI",
    description:
      "Revise AI turns your syllabus into smart, personalised revision sessions. Focus on what matters, retain more, and ace every exam.",
    url: "https://reviseai.vidvatailabs.com",
    siteName: "Revise AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revise AI — Smart Exam Revision, Powered by AI",
    description:
      "AI-powered revision for CBSE students. Topic summaries, MCQ quizzes, and progress tracking.",
  },
  metadataBase: new URL("https://reviseai.vidvatailabs.com"),
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
          <link rel="apple-touch-icon" href="/icons/icon.svg" />
          <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        </head>
        <body className={inter.className}>
          {children}
          <PWARegister />
        </body>
      </html>
    </ClerkProvider>
  );
}
