import { ReactNode } from 'react'

interface SiginInPageProps {
  children: ReactNode;
}

export default function SignInLayout({children}: SiginInPageProps) {

  return(
    <>
      <main>
        {children}
      </main>      
    </>
  )
}