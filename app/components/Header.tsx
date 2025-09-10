import Link from 'next/link';
import { CSSProperties } from 'react';

export default function Header(): JSX.Element {
  const headerStyle: CSSProperties = {
    padding: '20px',
    borderBottom: '1px solid #ddd',
    color: '#333',
    textDecoration: 'none'
  }

  const linkStyle: CSSProperties = {
    marginRight: '20px'
  }
  return (
    <header style={headerStyle}>
      <div>
        <Link href="/auth/signup">
          Sign Up
        </Link>
      </div>
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