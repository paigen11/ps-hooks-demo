import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import axios from 'axios';
import List from './List';
import { useFormInput } from '../hooks/forms';

const Todo = props => {
  const [inputIsValid, setInputIsValid] = useState(false);
  // const [todoName, setTodoName] = useState('');
  // const [submittedTodo, setSubmittedTodo] = useState(null);
  // const [todoList, setTodoList] = useState([]);
  // const [todoState, setTodoState] = useState({ userInput: '', todoList: [] });
  // const todoInputRef = useRef();
  const todoInput = useFormInput();

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return [...state, action.payload];
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  };

  // reducer function now native to React instead of Redux
  const [todoList, dispatch] = useReducer(todoListReducer, []);

  useEffect(() => {
    axios.get('https://test-a6122.firebaseio.com/todos.json').then(res => {
      console.log(res.data);
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

  // not needed when using useDispatch instead of useState
  // useEffect(() => {
  //   if (submittedTodo) {
  //     dispatch({ type: 'ADD', payload: submittedTodo });
  //   }
  // }, [todoList]);

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

  // not needed because of useRef hook
  // const inputChangeHandler = e => {
  //   // setTodoState({ userInput: e.target.value, todoList: todoState.todoList });
  //   setTodoName(e.target.value);
  // };

  const todoAddHandler = () => {
    // setTodoState({
    //   userInput: todoState.userInput,
    //   todoList: [...todoState.todoList, todoState.todoName],
    // });
    const todoName = todoInput.value;

    axios
      .post('https://test-a6122.firebaseio.com/todos.json', { name: todoName })
      .then(res => {
        // illustrating a bug based on time needed to reload the frontend with the code from the backend
        setTimeout(() => {
          console.log(res);
          const todoItem = { id: res.data.name, name: todoName };
          dispatch({ type: 'ADD', payload: todoItem });
        }, 3000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const todoRemoveHandler = todoId => {
    axios
      .delete(`https://test-a6122.firebaseio.com/todos/${todoId}.json`)
      .then(res => {
        dispatch({ type: 'REMOVE', payload: todoId });
      })
      .catch(err => console.log(err));
  };

  const inputValidationHandler = e => {
    if (e.target.value.trim === '') {
      setInputIsValid(false);
    } else {
      setInputIsValid(true);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Todo"
        // onChange={inputChangeHandler}
        // value={todoName}
        // ref={todoInputRef}
        // onChange={inputValidationHandler}
        onChange={todoInput.onChange}
        value={todoInput.value}
        style={{
          backgroundColor: todoInput.validity === true ? 'transparent' : 'red',
        }}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      {useMemo(
        () => (
          <List items={todoList} onClick={todoRemoveHandler} />
        ),
        [todoList]
      )}
    </>
  );
};

export default Todo;
