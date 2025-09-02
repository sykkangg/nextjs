import Link from 'next/link';
import { CSSProperties } from 'react';

export default function Header(): JSX.Element {
  const headerStyle: CSSProperties = {
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderBottom: '1px solid #ddd'
  }

  const linkStyle: CSSProperties = {
    marginRight: '20px'
  }
  return (
    <header style={headerStyle}>
      <nav>
        <Link href="/" style={linkStyle}>
          홈
        </Link>
        <Link href="/about" style={headerStyle}>
          소개
        </Link>
        <Link href="/blog" style={headerStyle}>
          블로그
        </Link>
      </nav>
    </header>
  )
}