import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav/NavBar";
import DashboardLayout from "@/components/defaults/DashboardLayout";
import ReduxProvider from "@/redux/provider";
import Footer from "@/components/shared/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gaming App",
  description: "Gaming Bio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable}   h-full antialiased`}>
      <body className="min-h-screen flex flex-col bg-instagram-gradient text-white">
        <ReduxProvider>
          {/* NAVBAR */}
          <NavBar />
          <DashboardLayout>{children}</DashboardLayout>
          <Footer/>
        </ReduxProvider>
      </body>
    </html>
  );
}
