import React, { useState } from 'react';

const Todo = props => {
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);

  const inputChangeHandler = e => {
    setTodoName(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoName}
      />
      <button type="button">Add</button>
      <ul></ul>
    </>
  );
};

export default Todo;
