import Home from "./pages/home/Home";
import { 
  BrowserRouter as Router, 
  Switch, 
  Route,
  Redirect
 } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/home/profile/Profile";
import ConfirmEmail from "./pages/resetpassword/ConfirmEmail";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

  const { user, resetUser } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          {user ? <Profile /> : <Redirect to="/" />}
        </Route>
        <Route path="/resetpasswod">
          {resetUser ? <ResetPassword /> : <ConfirmEmail /> }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
