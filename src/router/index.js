import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import NotFound from "../containers/NotFound";
import SignupInstructor from "../containers/SignupInstructor";
import SignupStudent from "../containers/SignupStudent";
import Dashboard from "../containers/Dashboard";
import Assignments from "../containers/Assignments";
import Login from "../containers/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/styles.scss";
import ProtectedRoutes from "../containers/ProtectedRoutes";
import Logout from "../containers/Logout";
import CourseSection from "../containers/CourseSection";
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/styles.scss';
import Members from '../containers/Members';
import SpecificAssignment from "../containers/SpecificAssignment";
import Submissions from "../containers/Submissions";
import Grades from "../containers/Grades";
import StudentGrades from "../containers/StudentGrades";
import Discussions from "../containers/Discussions";
import Notifications from "../containers/Notifications";
import Notes from "../containers/Notes";

const App = () => {
  return (
    <>
    <ToastContainer/>
    <Router>
      <Switch>
          <Route exact path={"/signup/instructor"} component={SignupInstructor}></Route>
          <Route exact path={"/signup/student"} component={SignupStudent}></Route>
          <Route exact path={["/", "/login"]} component={Login}></Route>
          <ProtectedRoutes exact path='/dashboard' component={Dashboard} />
          <ProtectedRoutes exact path='/logout' component={Logout} />
          <ProtectedRoutes exact path="/courses" component={Assignments} />
          <ProtectedRoutes exact path="/courses/:courseId/assignments" component={Assignments} />
          <ProtectedRoutes exact path="/courses/:courseId/assignments/:assignmentId" component={SpecificAssignment} />
          <ProtectedRoutes exact path="/courses/:courseId/assignments/:assignmentId/submissions/:submissionId" component={Submissions} />
          <ProtectedRoutes exact path="/courses/:courseId/members" component={Members} />
          <ProtectedRoutes
            exact
            path="/courses/:courseId/assignments"
            component={Assignments}
          />
          <ProtectedRoutes
            exact
            path="/courses/:courseId/settings"
            component={CourseSection}
          />
          <ProtectedRoutes exact path="/courses/:courseId/grades" component={Grades} />
          <ProtectedRoutes exact path="/courses/:courseId/student/grades" component={StudentGrades} />
          <ProtectedRoutes exact path="/courses/:courseId/discussions" component={Discussions} />
          <ProtectedRoutes exact path="/notifications" component={Notifications} />
          <ProtectedRoutes exact path="/courses/:courseId/notes" component={Notes} />
          <ProtectedRoutes exact path="/courses/:courseId/notes/:noteId" component={Notes} />

          <Route component={NotFound} />
      </Switch>
    </Router>
    </>
  );
};

export default App;
