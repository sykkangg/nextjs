'use client'
import Link from 'next/link';
import Counter from './components/Counter'
import TodoList from './components/TodoList';
import { useState, useEffect } from 'react';

interface LoginInfo {
  id: string,
  password: string
}

export default function Home() {
  const [ loginInfo, setInfo ] = useState<LoginInfo>({id: '', password: ''});
  const [ ID, setID ] = useState<string>('');
  const [ PW, setPW ] = useState<string>('');

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInfo({id: ID, password: PW});

    // const login = () => {
    //   // 임시 클라이언트 사이드 로그인 (GitHub Pages용)
    //   if(ID === 'test' && PW === '111111') {
    //     console.log({ success: true, message: "로그인 성공" });
    //     alert("로그인 성공!");
    //   } else {
    //     console.log({ success: false, message: "로그인 실패" });
    //     alert("로그인 실패!");
    //   }
    // }
    // login();
    const login = async() => {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'},
            body: JSON.stringify({id: ID, password: PW})
        });
        console.log(response);

        if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        if(result.success) {
          alert('로그인 성공')
        } else {
          alert('로그인 실패')
        }
      }
      catch(error) {
        console.log('로그인 에러:', error);
      }
    }
    login();
  }

  useEffect(()=>{
    // console.log(ID, PW, loginInfo)
  },[ID, PW, loginInfo])

  return (
    <>
      <h3>Login</h3>
      <form onSubmit={formSubmit}>
        <div>
          <label htmlFor="id-input">ID </label><input id="id-input" type="text" onChange={(e)=>{setID(e.target.value);}}/>
        </div>
        <div>
          <label htmlFor="password">PS</label><input id="password" type="text" onChange={(e)=>{setPW(e.target.value);}}/>
        </div>
        <button>
          로그인
        </button>
      </form>
    </>
  );
}