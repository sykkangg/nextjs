// import "./globals.css";
import Header from './components/Header';
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="ko">
      <body>
        <Header/>
        <main>
          {children}
        </main>
        
      </body>
    </html>
  );
}
