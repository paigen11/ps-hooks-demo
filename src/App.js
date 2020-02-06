import React, { useState } from 'react';
import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';
import AuthContext from './auth-context';

const App = props => {
  // const [page, setPage] = useState('auth');
  const [showTodos, setShowToDos] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [authStatus, setAuthStatus] = useState(false);

  // const switchPage = pageName => {
  //   setPage(pageName);
  // };

  const todosHandler = () => {
    setShowToDos(true);
    setShowAuth(false);
  };

  const authHandler = () => {
    setShowAuth(true);
    setShowToDos(false);
  };

  const login = () => {
    setAuthStatus(true);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ status: authStatus, login: login }}>
        <Header onLoadTodos={todosHandler} onLoadAuth={authHandler} />
        <hr />
        {showTodos && <Todo />}
        {showAuth && <Auth />}
      </AuthContext.Provider>
    </div>
  );
};

export default App;
