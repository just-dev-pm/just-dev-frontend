import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import "rsuite/dist/rsuite-no-reset.min.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CustomProvider } from "rsuite";
import zhCN from "rsuite/locales/zh_CN";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Just Dev",
  description: "Simple but powerful project manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(poppins.className)}>
        <CustomProvider locale={zhCN}>{children}</CustomProvider>
        <Toaster />
      </body>
    </html>
  );
}
