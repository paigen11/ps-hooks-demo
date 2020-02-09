import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const Todo = props => {
  const [todoName, setTodoName] = useState('');
  const [submittedTodo, setSubmittedTodo] = useState(null);
  // const [todoList, setTodoList] = useState([]);
  // const [todoState, setTodoState] = useState({ userInput: '', todoList: [] });
  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return [...state, action.payload];
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.payload.id);
      default:
        return state;
    }
  };

  // reducer function now native to React instead of Redux
  const [todoList, dispatch] = useReducer(todoListReducer, []);

  useEffect(() => {
    axios.get('https://test-a6122.firebaseio.com/todos.json').then(res => {
      console.log(res);
      const todoData = res.data;
      const todos = [];
      for (const key in todoData) {
        todos.push({ id: key, name: todoData[key].name });
      }
      dispatch({ type: 'SET', payload: todos });
    });
    return () => {
      console.log('Cleanup');
    };
  }, []);

  useEffect(() => {
    if (submittedTodo) {
      dispatch({ type: 'ADD', payload: submittedTodo });
    }
  }, [submittedTodo, todoList]);

  // const mouseMoveHandler = e => {
  //   console.log(e.clientX, e.clientY);
  // };

  // useEffect(() => {
  //   document.addEventListener('mousemove', mouseMoveHandler);

  //   // this is the cleanup function for useEffect
  //   return () => {
  //     document.removeEventListener('mousemove', mouseMoveHandler);
  //   };
  // });

  const inputChangeHandler = e => {
    // setTodoState({ userInput: e.target.value, todoList: todoState.todoList });
    setTodoName(e.target.value);
  };

  const todoAddHandler = () => {
    // setTodoState({
    //   userInput: todoState.userInput,
    //   todoList: [...todoState.todoList, todoState.todoName],
    // });
    axios
      .post('https://test-a6122.firebaseio.com/todos.json', { name: todoName })
      .then(res => {
        // illustrating a bug based on time needed to reload the frontend with the code from the backend
        setTimeout(() => {
          console.log(res);
          const todoItem = { id: res.data.name, name: todoName };
          setSubmittedTodo(todoItem);
        }, 3000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoName}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
