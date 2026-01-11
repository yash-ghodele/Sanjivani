import "./globals.css";

import { Inter, Outfit } from "next/font/google";
import { NotificationProvider } from "@/context/NotificationContext";
import { I18nProvider } from "@/components/I18nProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-nature-900 text-white font-sans selection:bg-nature-500/30 selection:text-white`} suppressHydrationWarning>
        <NotificationProvider>
          <I18nProvider>
            {/* <ServiceWorkerRegister /> */}
            {children}
          </I18nProvider>
        </NotificationProvider>
      </body>

    </html>
  );
}
