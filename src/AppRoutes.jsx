import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/login.jsx';
import Home from './pages/home.jsx';

const AppRoutes = () => {

  const Selector = useSelector((item) => item.login);
  console.log("Selector",Selector);

  return (
    
    <React.Fragment>
       
      {!Selector ? (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </>
      ) : (
        <>
          <Home/>
        </>
      )}
    </React.Fragment>
  );
}

export default AppRoutes;

