import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Foods from "./pages/foods";
import Main from "./components/layout/Main";
import 'antd/dist/reset.css';
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserDashboard from "./components/UserDashboard";
import SuperAdminDashboard from "./components/SuperAdminDashboard";

const App = () => {

  const Selector = useSelector((item) => item.login);
  console.log(Selector);
  const [role, setRole] = useState(null);
  
  return (
    
    <React.Fragment>
      {!Selector ? (
        <>
       <Switch>
        <Main>
          <Route exact path="/foods"> <Foods /> </Route>
          <Route exact path="/signin" >  <Login setRole={setRole} /> </Route>
          <Route exact path="/signup" >  <Register /> </Route>
          <Redirect from="*" to="/foods" />
        </Main>
      </Switch>
        </>
      ) : (
        <>
        <Switch>
          <Main>
            <Route exact path="/user-dashboard"> <ProtectedRoute component={UserDashboard} role={role} allowedRoles={["user"]} /> </Route>
            <Route exact path="/super-admin-dashboard"> <ProtectedRoute component={SuperAdminDashboard} role={role} allowedRoles={["super-admin"]} /> </Route>
          </Main>
        </Switch>    
        </>
      )}
    </React.Fragment>
  );
};

export default App;


// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import UserDashboard from "./components/UserDashboard";
// import SuperAdminDashboard from "./components/SuperAdminDashboard";
// import ProtectedRoute from "./routes/ProtectedRoute";

// const App = () => {
//   const [role, setRole] = useState(null);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login setRole={setRole} />} />
//         <Route path="/register" element={<Register />} />
//         <Route
//           path="/user-dashboard"
//           element={
//             <ProtectedRoute component={UserDashboard} role={role} allowedRoles={["user"]} />
//           }
//         />
//         <Route
//           path="/super-admin-dashboard"
//           element={
//             <ProtectedRoute
//               component={SuperAdminDashboard}
//               role={role}
//               allowedRoles={["super-admin"]}
//             />
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;





