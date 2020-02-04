import React, { useState } from 'react';

const Todo = props => {
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);
  // const [todoState, setTodoState] = useState({ userInput: '', todoList: [] });

  const inputChangeHandler = e => {
    // setTodoState({ userInput: e.target.value, todoList: todoState.todoList });
    setTodoName(e.target.value);
  };

  const todoAddHandler = () => {
    // setTodoState({
    //   userInput: todoState.userInput,
    //   todoList: [...todoState.todoList, todoState.todoName],
    // });
    setTodoList([...todoList, todoName]);
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
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
