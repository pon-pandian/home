import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/login";
import PrivateLayout from "./pages/privateLayout/privateLayout";
import Register from "./pages/register/register";
import { connect } from 'react-redux';
class AppRoute extends React.Component {
 
  render(){

  return (
  
    <React.Fragment>
      {!this.props.login ? (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </>
      ) : (
        <>
          <PrivateLayout/>
        </>
      )}
    </React.Fragment>
  );

 
  } 
};

const mapStateToProps = (state) => ({
  login : state.login
});

export default connect(mapStateToProps) (AppRoute);
