import React , { createContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from './app/store';
import {Provider} from 'react-redux';



export const Context = createContext({
  
  isAuthenticated: false,
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuthState = localStorage.getItem('isAuthenticated');
    return savedAuthState ? JSON.parse(savedAuthState) : false;
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('user', JSON.stringify(user));
  }, [isAuthenticated, user]);

  return (
    <Provider store={store}>
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      <>
      <App/>
      </>
      
    </Context.Provider>
    </Provider>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>
);


