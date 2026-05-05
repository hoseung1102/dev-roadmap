import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '최진빈의 개발 로드맵',
  description: 'OpenClaw를 향한 여정',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[#0a0a0a] text-white antialiased">
        <header className="border-b border-white/10 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-amber-400 text-xl">🦞</span>
              <span className="font-semibold text-white">OpenClaw 로드맵</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/" className="text-zinc-400 hover:text-white transition-colors">대시보드</Link>
              <Link href="/curriculum" className="text-zinc-400 hover:text-white transition-colors">커리큘럼</Link>
              <Link href="/admin" className="text-zinc-400 hover:text-white transition-colors">관리자</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
