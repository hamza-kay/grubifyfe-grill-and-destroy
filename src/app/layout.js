import { Inter } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import "@/styles/globals.css";



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"], // match exactly
});
;

export const metadata = {
  title: "Popular Pizza",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <ClientLayout>
          <div className="flex-grow">
            {children}
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
