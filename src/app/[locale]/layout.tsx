import type { Metadata } from "next";
import "./globals.css";
import AntProvider from "@/components/ant-provider";
import NextIntlProvider from "@/components/next-intl-provider";
import { defaultLocale } from "@/navigation";

export const metadata: Metadata = {
  title: "Rye Admin",
  description: "Generated by rye admin",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={defaultLocale}>
      <body>
        <NextIntlProvider params={{ locale }}>
          <AntProvider>{children}</AntProvider>
        </NextIntlProvider>
      </body>
    </html>
  );
}
