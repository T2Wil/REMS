import { CREATE_COURSE_FAILURE, CREATE_COURSE_SUCCESS, GET_COURSE_FAILURE, GET_COURSE_SUCCESS, CREATE_COURSE_START } from "./actionTypes";
import actionCreator from "./actionCreator";
import { toast } from "react-toastify";

export const createCourse = (newCourse) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    dispatch(actionCreator(CREATE_COURSE_START));
    return firestore
          .collection("courses")
          .add(newCourse)
          .then((doc)=>{
              const res = newCourse;
              res.id = doc.id;
              toast.success('Course created successfully', {
                position: "top-center",
                hideProgressBar: true,
              });
              return dispatch(actionCreator(CREATE_COURSE_SUCCESS, res));
          })
          .catch((err) => {
            toast.error(err, {
              position: "top-center",
              hideProgressBar: true,
            });
            return dispatch(actionCreator(CREATE_COURSE_FAILURE, err));
      });
  };
};

export const getCourses = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    dispatch(actionCreator(CREATE_COURSE_START));
    const courses = [];
    return firestore
          .collection("courses")
          .get()
          .then((res)=>{
            res.forEach((doc) => {
              const data = doc.data()
              data.id = doc.id;
              courses.push(data)
            });
            return dispatch(actionCreator(GET_COURSE_SUCCESS, courses));
          })
          .catch((err) => {
            toast.error(err, {
              position: "top-center",
              hideProgressBar: true,
            });
            return dispatch(actionCreator(CREATE_COURSE_FAILURE, err));
      });
  };
};

export const publishOrUnpublishCourses = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const course = firestore.collection("courses").doc(data.id);
    data.isPublished = !data.isPublished
    return course.update(data)
    .then((res)=>{
      toast.success(`Course ${data.isPublished ? 'published' : 'unpublished'} successfully`, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(GET_COURSE_SUCCESS, course));
    })
    .catch((err) => {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(CREATE_COURSE_FAILURE, err));
    });
  };
};
