import React from "react";
import { Route, BrowserRouter as Router,Switch, Redirect } from "react-router-dom";
import NotFound from '../containers/NotFound';
import SignupInstructor from "../containers/SignupInstructor";
import SignupStudent from '../containers/SignupStudent';
import DashboardInstructor from "../containers/DashboardInstructor";
import DashboardStudent from '../containers/DashboardStudent';
import Assignments from "../containers/Assignments";
import Login from '../containers/Login';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/styles.scss';
import Members from '../containers/Members';
import DashboardRedirect from '../containers/DashboardRedirect';
import ProtectedRoute from '../containers/ProtectedRoute';

const App = () => {
  return (
    <>
    <ToastContainer/>
    <Router>
      <Switch>
        <Route exact path={["/","/signup"]} component={SignupInstructor}>
          <Redirect to="/signup/instructor" />
          </Route>
          <Route exact path={"/signup/instructor"} component={SignupInstructor}></Route>
          <Route exact path={"/signup/student"} component={SignupStudent}></Route>
          <Route exact path={"/login"} component={Login}></Route>
          <Route exact path="/ins.dashboard" component={DashboardInstructor} />
          {/* <ProtectedRoute exact path='/ins.dashboard' user="instructor" component={DashboardInstructor} /> */}

          <Route exact path="/stu.dashboard" component={DashboardStudent} />
          <Route exact path="/courses" component={Assignments} />
          <Route exact path="/courses/:courseId/assignments" component={Assignments} />
          <Route exact path="/courses/:courseId/members" component={Members} />
          <Route exact path="/dashboardRedirect" component={DashboardRedirect} />
          <Route component={NotFound} />
      </Switch>
    </Router>
    </>
  );
};

export default App;