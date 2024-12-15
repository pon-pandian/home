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
import AdminDashboard from "./components/AdminDashboard";
import AdminAddFood from "./components/AdminAddFood";
import AddAdmin from "./components/AddAdmin";
import OrderPage from "./components/OrderPage";
import PaymentPage from "./components/PaymentPage";

const App = () => {

const Selector = useSelector((item) => item);
const { login , token } = Selector;
const [role, setRole] = useState(null);
console.log(token.token,"role")
return (
<React.Fragment>
{!login ? (
<>
<Main>
<Switch>
<Route path="/foods" > <Foods /> </Route>
<Route path="/signin" > <Login setRole={setRole} /> </Route>
<Route path="/signup" > <Register /> </Route>
<Route path="*"><Redirect to={"/foods"} /></Route>
</Switch>
</Main>
</>
) :
( token.token.role === "user" ?
<>
<Main>
<Switch>
<Route path="/user-dashboard"> <ProtectedRoute component={UserDashboard} role={role} allowedRoles={["user"]} /> </Route>
<Route path="/order"> <ProtectedRoute component={OrderPage} role={role} allowedRoles={["user"]} /> </Route>
<Route path="/payment"> <ProtectedRoute component={PaymentPage} role={role} allowedRoles={["user"]} /> </Route>
<Route path="*"><Redirect to={"/user-dashboard"} /></Route>
</Switch>
</Main>
</>
:
token.token.role === "super-admin" ?
<>
<Main>
<Switch>
<Route path="/super-admin-dashboard"> <ProtectedRoute component={SuperAdminDashboard} role={role} allowedRoles={["super-admin"]} /> </Route>
<Route path="/add-admin"> <ProtectedRoute component={AddAdmin} role={role} allowedRoles={["super-admin"]} /> </Route>
<Route path="*"><Redirect to={"/super-admin-dashboard"} /></Route>
</Switch>
</Main>
</>
:
<>
<Main>
<Switch>
<Route path="/admin-dashboard"> <ProtectedRoute component={AdminDashboard} role={role} allowedRoles={["admin"]} /> </Route>
<Route path="/admin-addfood"> <ProtectedRoute component={AdminAddFood} role={role} allowedRoles={["admin"]} /> </Route>
<Route path="*"><Redirect to="/admin-dashboard" /></Route>
</Switch>
</Main>
</>
)}
</React.Fragment>
);
};

export default App;



























