import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import "@/styles/globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <ClientLayout>
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
