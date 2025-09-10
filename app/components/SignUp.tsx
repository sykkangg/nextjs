'use client'
import React from 'react'
import { useState, useEffect, useRef } from 'react';
import styles from '@/app/style/SignUp.module.css'

interface userInfo {
  username: string;
  email: string;
  password: string;
}

interface errorMessages {
  message1: string;
  message2: string;
  message3: string;

}

export default function Signin(){

  const [ username, setUsername ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ userInfo, setUserInfo ] = useState<userInfo>({  username: '', email: '', password: ''})
  const [errorMessage, setErrorMessage] = useState<errorMessages>({message1: '', message2: '', message3: ''});
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const getUserName = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const value = e.target.value;
    setUsername(value);

    if(value.length === 0) {
      setErrorMessage({...errorMessage, message1: '이름을 입력해 주세요'})
    } else if(value.length<3){setErrorMessage({...errorMessage, message1: '이름을 2글자 이상 입력하세요'})}
    else {setErrorMessage({...errorMessage, message1: ''})}
  }

  const getEmail = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const value = e.target.value;
    setEmail(value);

    if(!value.includes('@')){setErrorMessage({...errorMessage, message2: `이메일을 '@' 포함하여 입력하세요`})}
    else {setErrorMessage({...errorMessage, message2: ''})}
  }

  const getPassword = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const value = e.target.value;
    setPassword(value);

    if(value.length < 8){setErrorMessage({...errorMessage, message3: '비밀번호를 8자 이상 입력하세요'})}
    else {setErrorMessage({...errorMessage, message3: ''})}
  }

  const handleUsernameBlur = () => {
    if(username.length === 0){setErrorMessage({...errorMessage, message1: '이름을 입력해 주세요'})}
    else if(username.length<3){setErrorMessage({...errorMessage, message1: '이름을 2글자 이상 입력하세요'})}
    else {setErrorMessage({...errorMessage, message1: ''})}
  }

  const handleEmailBlur = () => {
    if(!email.includes('@')){setErrorMessage({...errorMessage, message2: `이메일을 '@' 포함하여 입력하세요`})}
    else {setErrorMessage({...errorMessage, message2: ''})}
  }

  const handlePasswordBlur = () => {
    if(password.length < 8){setErrorMessage({...errorMessage, message3: '비밀번호를 8자 이상 입력하세요'})}
    else {setErrorMessage({...errorMessage, message3: ''})}
  }

  const submit = (e:React.FormEvent):void  => {
    e.preventDefault();
    if(username.length < 3){
      setErrorMessage({...errorMessage, message1: '이름을 2글자 이상 입력하세요'});
      usernameRef.current?.focus();
      return;
    }
    if(!email.includes('@')){
      setErrorMessage({...errorMessage, message2: `이메일을 '@' 포함하여 입력하세요`})
      emailRef.current?.focus();
      return;
    }
    if(password.length < 8){
      setErrorMessage({...errorMessage, message3: '비밀번호를 8자 이상 입력하세요'})
      passwordRef.current?.focus();
      return;
    }
    setErrorMessage({...errorMessage, message1: '', message2: '', message3: ''});
    setUserInfo({...userInfo, username: username, email: email, password: password});
  }

  useEffect(()=>{
    console.log(errorMessage);
  }, [errorMessage])

  return(
    <>
      <h2>회원가입</h2>
      <form onSubmit={submit}>
        
        <label htmlFor="signup-username">이름</label>
        <div>
          <input ref={usernameRef} className={styles.signupInput} id="signup-username" value={username} onChange={getUserName} onBlur={handleUsernameBlur} type="text"
          style={{outlineColor: errorMessage?.message1 ? 'red' : 'blue', border: errorMessage?.message1 ? '1px solid red' : '1px solid black'}} />
          {errorMessage && errorMessage.message1 ? <p style={{color: 'red', fontSize: '12px'}}>{errorMessage.message1}</p> : <span></span>}
        </div>
        
        <label htmlFor="signup-email">이메일</label>
        <div>
          <input ref={emailRef} className={styles.signupInput} id="signup-email" value={email} onChange={getEmail} onBlur={handleEmailBlur} type="text"
          style={{outlineColor: errorMessage?.message2 ? 'red' : 'blue', border: errorMessage?.message2 ? '1px solid red' : '1px solid black'}} />
          {errorMessage && errorMessage.message2 ? <p style={{color: 'red', fontSize: '12px'}}>{errorMessage.message2}</p> : ''}
          {/* {email?.includes('@') ? <></> : <p style={{color: 'red', fontSize: '12px'}}>메일 형식 &apos;@&apos; 포함하여 입력하세요</p>} */}
        </div>
        <label htmlFor="signup-pw">패스워드</label>
        <div>
          <input ref={passwordRef} className={styles.signupInput} id="signup-pw" value={password} onChange={getPassword} onBlur={handlePasswordBlur} type="text"
          style={{outlineColor: errorMessage?.message3 ? 'red' : 'blue', border: errorMessage?.message3 ? '1px solid red' : '1px solid black'}} />
          {errorMessage && errorMessage.message3 ? <p style={{color: 'red', fontSize: '12px'}}>{errorMessage.message3}</p> : ''}
          {/* {password?.length<8 ? <p style={{color: 'red', fontSize: '12px'}}>8자 이상 입력하세요</p> : <></>} */}
        </div>
        <button>확인</button>
      </form>
    </>
  )
}