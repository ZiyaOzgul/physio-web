import type { Metadata } from "next";
import { Archivo_Narrow, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo_Narrow({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ANATOMİ 3D • Tıp Fakültesi Sürümü | Klinik ve Dijital Anatomi Sistemi",
  description:
    "2.900+ mikroskobik ve topografik anatomik yapı, 6 hassas diseksiyon katmanı, kişiselleştirilmiş komite müfredatı ve gerçekçi zilli pratik sınav simülasyonu. iOS ve Android'de.",
  icons: {
    icon: "/favicon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${archivo.variable} ${jakarta.variable} ${mono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#f8f9ff] text-[#0b1c30] selection:bg-[#39b8fd]/30 selection:text-[#003752]">
        {children}
      </body>
    </html>
  );
}
