import React from "react";
import { Route, BrowserRouter as Router,Switch, Redirect } from "react-router-dom";
import NotFound from '../containers/NotFound';
import SignupInstructor from "../containers/SignupInstructor";
import SignupStudent from '../containers/SignupStudent';
import Login from '../containers/Login';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={["/","/signup"]} component={SignupInstructor}>
          <Redirect to="/signup/instructor" />
          </Route>
          <Route exact path={"/signup/instructor"} component={SignupInstructor}></Route>
          <Route exact path={"/signup/student"} component={SignupStudent}></Route>
          <Route exact path={"/login"} component={Login}></Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;