'use client';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { MdDelete } from "react-icons/md";
import styles from '@/app/style/todoList.module.css';

interface Todo {
  id: number,
  text: string,
  completed: boolean
}

export default function TodoList():JSX.Element {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const changeValue = (event: ChangeEvent<HTMLInputElement>):void => {
    event.preventDefault();
    const value:string = event.target.value;
    setValue(value);
  }

  const addList = (event: FormEvent<HTMLFormElement>):void => {
    event.preventDefault();
    if(value.trim() !== '') {
      setTodos(prev=>[...prev, {id: Date.now(), text: value, completed: false}]);
      setValue('');
    }
  }

  const deleteList = (id: number): void => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const checkToggle = (thisId:number) => (event: ChangeEvent<HTMLInputElement>): void => {
      setTodos(prev => prev.map((item)=>item.id == thisId ? {...item, completed: !item.completed} : item))
  }

  const filteredTodos = (): Todo[] => {
    if(filter === 'active') return todos.filter(todo=>!todo.completed)
    if(filter === 'completed') return todos.filter(todo=>todo.completed)
    return todos;
  }

  const showAll = () => setFilter('all');
  const showActive = () => setFilter('active');
  const showCompleted = () => setFilter('completed');


  // Debugging
  useEffect(()=>{
    console.log(todos);
  },[todos])

  return(
    <>
      <h3>Add ToDos</h3>
      <span style={{paddingRight: '10px'}}>To Do</span>
      {/* <p>active: {todos.filter((item)=>!item.completed).length}</p>
      <p>completed: {todos.filter((item)=>item.completed).length}</p> */}
      <form onSubmit={addList}>
        <div className={styles.inputWrap}>
          <input style={{border: '1px solid #d2d2d2'}} type="text"
          onChange={changeValue} value={value}/>
          <button type="submit"
          style={{backgroundColor: '#333', color: '#fff', padding: '4px 8px', cursor: 'pointer'}}>
            Add</button>
        </div>
      </form>
      <div>
        <button onClick={showAll}>All</button>
        <button onClick={showActive}>Active</button>
        <button onClick={showCompleted}>Completed</button>
      </div>
        {todos.length === 0 ? <p>할 일이 없습니다</p> : null}
      <ul style={{padding: 0}}>
        {filteredTodos().map((item, index)=>(
          <li className={styles.toDoList} style={{listStyle: 'none', padding: '4px 0'}} key={index}>
            <input className={styles.checkBox} type="checkbox"checked={item.completed}  onChange={checkToggle(item.id)}/>
            <p className={styles.toDoPara}>{item.text}</p>
            <span onClick={()=>{deleteList(item.id)}} className={styles.trashBin}><MdDelete /></span>
          </li>
        ))}
      </ul>
    </>
  )
}