import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

export const metadata: Metadata = {
  title: 'YVB Fragrances | Luxury Perfumes',
  description: 'Discover exquisite fragrances for men and women. Premium scents that define elegance and sophistication.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <AuthProvider>
          <Header />
          <div className="pt-24">
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}