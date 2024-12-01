import React, { useEffect, useState } from "react";
import { googleLogout } from '@react-oauth/google';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../redux/store/store"
import { logoutAction } from '../redux/actionCreator/actionCreator';
import "../DarkMode.css";
import Upload from "./upload";
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Generate from "./generate";
import View from "./view";
import Gallery from "./gallery";


const Home = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const Selector = useSelector((item) => item.token.token);
    const { name , email, picture } = Selector;
    console.log(Selector)
   
   
    const handleLogout = () => {
        googleLogout();
        navigate("/");
        persistor.purge();
        dispatch(logoutAction());
    }

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
      });

      const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
      };
      
        const handleToggle = () => {
          setIsCollapsed((prevState) => !prevState); 
        };
      

      useEffect(() => {
        localStorage.setItem("theme", theme);
      }, [theme]);

    return (
        <>
      
        <div className={`container-fluid vh-100 d-flex align-items-center justify-content-center ${
                    theme === "light" ? "bg_light_blue text-dark" : "bg-secondary text-light"
                }`}>
        <div  className={`container py-4 px-3 home_inner_box login_shadow ${
                        theme === "light" ? "bg-white" : "bg-dark"
                    }`}>
       <Navbar bg={`${theme === "light" ? "bg-light" : "bg-dark"}`} expand="lg" className={`shadow-sm nav_shadow`}>
      <Container>

        <Navbar.Brand onClick={() => navigate("/upload")} className={`fw-bold ${theme === "light" ? "text-dark" : "text-light"}`}>
          Generator App
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav"  onClick={handleToggle}/>
        <Navbar.Collapse id="navbar-nav">
         
          <Nav className={`me-auto nav_hover`} >
            <span><Nav.Link onClick={() => navigate("/upload")} className={`${theme === "light" ? "text-dark" : "text-light"}`}>Upload</Nav.Link></span>
            <span> <Nav.Link onClick={() => navigate("/generate")} className={`${theme === "light" ? "text-dark" : "text-light"}`}>Generate</Nav.Link></span>
            <span> <Nav.Link onClick={() => navigate("/view")} className={`${theme === "light" ? "text-dark" : "text-light"}`}>View</Nav.Link></span>
            <span> <Nav.Link onClick={() => navigate("/gallery")} className={`${theme === "light" ? "text-dark" : "text-light"}`}>Gallery</Nav.Link></span>
            
          </Nav>
          
          <Nav>
            <NavDropdown
              
              title={
                <div className="d-flex align-items-center">
                  <Image
                    src={picture}
                    roundedCircle
                    className="me-2"
                    alt="Profile Icon"
                    style={{ maxHeight: "50px", maxWidth: "50px"}}
                  />
                  <div>
                    <strong className={`${theme === "light" ? "text-dark" : "text-light"}`}>{name}</strong>
                    <div className={`${theme === "light" ? "text-muted" : "text-light"}`} style={{ fontSize: "0.9rem" }}>
                    {email}
                    </div>
                  </div>
                </div>
              }
              id="profile-dropdown"
              align="end"
            >
              <NavDropdown.Item onClick={(e)=> toggleTheme(e)}>Switch to {theme === 'light'? 'dark': 'light'} mode</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=> handleLogout()}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse >
      </Container>
    </Navbar>
       
            <div className={`mt-3 layout_box ${isCollapsed ? "d-none" : "d-block"} d-lg-block
              ${theme === "light" ? "bg-success text-light" : "bg-danger text-light"}`}>
          
        {
          <Routes>
            <Route path="/upload" element={<Upload /> } />
            <Route path="/generate" element={<Generate />} />
            <Route path="/view" element={<View /> } />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="*" element={<Navigate to={"/upload"} />} />
          </Routes>
        }
    
              </div> 
             <div className={`mt-1 ms-3`}>Copyright © 2024 Pon Pandian, All Rights Reserved</div>
        </div>
        </div>
        
          
        </>

        
        
       
    );
}

export default Home;