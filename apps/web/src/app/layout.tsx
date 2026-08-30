import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ZUSTAG | Hyperlocal Fashion Commerce Network',
  description: 'ZUSTAG turns every local showroom in Jamshedpur into a digital storefront with 30-minute hyper-express delivery. Built by Kangqore Group.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0f1d] text-slate-100 min-h-screen antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
