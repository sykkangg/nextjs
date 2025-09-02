'use client';
import { useState, useEffect } from 'react';
import { MouseEvent } from 'react';
import { CSSProperties } from 'react';

interface CounterValue {
  initialValue?: number,
  title?: string
}

type ButtonColors = 'tomato' | 'indigo' | 'green';
type Emojies = '🌏' | '✨' | '🔮'

export default function Counter({initialValue=0, title="카운터"}: CounterValue):JSX.Element {
  const [count, setCount] = useState<number>(initialValue);
  const [bgColor, setBgColor] = useState<ButtonColors>('tomato');
  const [emoji, setEmoji] = useState<Emojies>('🌏');

  const bgColors:ButtonColors[] = ['tomato', 'indigo', 'green'];
  const emojies:Emojies[] = ['🌏', '✨', '🔮'];

  const increment = (event: MouseEvent<HTMLButtonElement>): void => {
    // console.log('🔺 증가 버튼 클릭!', {
    //   target: event.target,
    //   currentTarget: event.currentTarget,
    //   clientX: event.clientX,
    //   clientY: event.clientY,
    //   button: event.button
    // });
    setCount((prev)=>{
      const getIndex = (prev+1) % 3;
      const newColor = bgColors[getIndex];
      const newEmoji = emojies[getIndex];
      setBgColor(newColor);
      setEmoji(newEmoji);

      return prev+1;
    })
  }

  // useEffect(()=>{
  // },[bgColor])

  const decrement = (event: MouseEvent<HTMLButtonElement>):void => {
    setCount((prev)=>{
      const getIndex = (prev-1) % 3;
      const newColor = bgColors[getIndex];
      const newEmoji = emojies[getIndex];
      setBgColor(newColor);
      setEmoji(newEmoji);

      return prev-1;
    })
  }

  const reset = (event: MouseEvent<HTMLButtonElement>): void => {
    setCount((prev)=>{
      const newColor = bgColors[0];
      const newEmoji = emojies[0];
      setBgColor(newColor);
      setEmoji(newEmoji);
      return 0;
    })
  }

  const totalBgStyle:CSSProperties = {
    backgroundColor: bgColor,
    borderRadius: '10px',
    padding: '10px 20px',
    color: '#d7d7d7'
  }

  return(
    <>
      <h3>{title}</h3>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>reset</button>
      <p  style={totalBgStyle}>total: {count}{emoji}</p>
    </>
  )
}