import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/actionCreator/actionCreator";
import { ReactComponent as Sun } from "../assets/images/Sun.svg";
import { ReactComponent as Moon } from "../assets/images/Moon.svg";
import LoginImage from "../assets/images/LoginImage.png";
import SunImage from "../assets/images/SunImage.png";
import MoonImage from "../assets/images/MoonImage.png";
import PdfExcel from "../assets/images/PdfExcel.png";
import "../DarkMode.css";

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <>
            <div
                className={`container-fluid vh-100 d-flex align-items-center justify-content-center ${
                    theme === "light" ? "bg_light_blue text-dark" : "bg-secondary text-light"
                }`}
            >
                <div
                    className={`container py-4 px-3 login_inner_box login_shadow ${
                        theme === "light" ? "bg-white" : "bg-dark"
                    }`}
                >
                    <div className="row ">
                       
                        <div className="col-12 col-md-7 mb-4 mb-md-0">
                            <div className="dark_mode mb-4">
                                <input
                                    className="dark_mode_input"
                                    type="checkbox"
                                    id="darkmode-toggle"
                                    checked={theme === "dark"}
                                    onChange={toggleTheme}
                                />
                                <label className="dark_mode_label" htmlFor="darkmode-toggle">
                                    <Sun />
                                    <Moon />
                                </label>
                            </div>
                            <div className="pt-md-5 text-center text-md-start">
                                
                                <h2 className="fs-4 ps-md-4 fw-bold">Sign In to Upload Files </h2>
                                <p className="mt-3 ms-md-1 ps-md-5">
                                    Upload and view XLS, PDF, Images, and generate invoices easily.
                                </p>
                              <div className="ms-md-5 d-none d-md-block mt-0 pt-0">
                               <img
                                src={LoginImage}
                                alt="Login"
                                style={{ maxHeight: "300px", display:"inline-block"}}
                              />
                             </div>
                             
                            
                        
                            </div>
                        </div>

                       
                        <div className="col-12 col-md-5 mb-4 mb-md-0">
                           <div className="row d-flex justify-content-center align-items-center">
                           <img
                                className="img-fluid d-none d-md-block d-flex justify-content-center align-items-center"
                                src={theme === 'light' ? SunImage : MoonImage}
                                alt="Mode"
                                style={{ maxHeight: "300px",maxWidth: "300px", display:"inline-block"}}
                            />
                            <img
                                className="img-fluid d-md-none md-block"
                                src={theme === 'light' ? SunImage : MoonImage}
                                alt="Mode"
                                style={{ maxHeight: "300px", maxWidth: "300px" ,display:"inline-block"}}
                            />

                           </div>
                           <div className="row">
                            <div className="d-flex justify-content-center align-items-center" >
                        
                           <GoogleLogin
                                
                                onSuccess={(credentialResponse) => {
                                    console.log(credentialResponse);
                                    const token = jwtDecode(credentialResponse.credential);
                                    dispatch(loginAction(token));
                                    navigate("/home");
                                }}
                                onError={() => {
                                    console.log("Login Failed");
                                }}
                               
                            />
                            </div>
                            </div>
                            <div className="row d-flex justify-content-center align-items-center mt-5">
                           <img
                                className="img-fluid d-none d-md-block"
                                src={PdfExcel}
                                alt="Mode"
                                style={{ maxHeight: "300px", maxWidth: "200px", display:"inline-block"}}
                            />

                           </div>

                          
                           
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
