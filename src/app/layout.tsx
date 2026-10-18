import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import DemoRoleSwitcherBar from '@/components/ui/DemoRoleSwitcherBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlobalAudioPlayer from '@/components/music/GlobalAudioPlayer';
import ToastContainer from '@/components/ui/ToastContainer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

export const metadata: Metadata = {
  title: 'Soulscape | 数字身心觉知生态平台 (Investor Demo)',
  description: '连接88枚原初神谕卡、调频声波乐库、七脉轮全息探索、觉知导师智库与AI向导的下一代身心科技生态。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="min-h-screen bg-[#FAF8F5] text-[#212523] flex flex-col antialiased selection:bg-sage-200 selection:text-sage-900">
        <AppProvider>
          {/* Top Demo Floating Bar */}
          <DemoRoleSwitcherBar />

          {/* Sticky Navigation */}
          <Navbar />

          {/* Main Viewport Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Global Ambient Binaural Audio Player */}
          <GlobalAudioPlayer />

          {/* Global Notification Toast Container */}
          <ToastContainer />

          {/* Mobile Bottom Navigation Bar */}
          <MobileBottomNav />

          {/* Global Footer */}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
