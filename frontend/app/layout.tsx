import "./globals.css";

import "@fontsource/outfit/400.css";
import "@fontsource/outfit/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";

import { NotificationProvider } from "@/context/NotificationContext";
import { I18nProvider } from "@/components/I18nProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-nature-900 text-white font-sans selection:bg-nature-500/30 selection:text-white" suppressHydrationWarning>
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
