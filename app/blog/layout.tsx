import { ReactNode } from 'react';

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({children}: BlogLayoutProps): JSX.Element{

  return(
    <>
      <h3>블로그 포스트</h3>
      <nav>

      </nav>
      <main>
        {children}
      </main>
    </>
  )
}