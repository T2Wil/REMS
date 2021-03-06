import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import auth from "./authReducer";
import courses from './coursesReducer';
import assignments from './assignmentsReducer';
import students from './studentsReducer';
import invitations from './invitationsReducer';
import chatsReducer from "./chatsReducer";
import notesReducer from "./notesReducer";
import membersReducer from "./membersReducer";

export default combineReducers({
  auth,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  courses,
  assignments,
  students,
  invitations,
  chat: chatsReducer,
  notes: notesReducer,
  members: membersReducer,
});