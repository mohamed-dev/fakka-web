import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import BottomTabBar from "@/components/BottomTabBar";
import PageTransition from "@/components/PageTransition";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "فكة | Fakka",
  description: "وفّر فكتك تلقائيًا نحو الزكاة، أهداف الادخار، أو الصدقة",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#163527",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-tajawal antialiased">
        <Sidebar />
        <div className="md:mr-64">
          <MobileHeader />
          <main className="mx-auto max-w-6xl px-4 pb-28 pt-5 md:px-8 md:py-10">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
        <BottomTabBar />
      </body>
    </html>
  );
}
