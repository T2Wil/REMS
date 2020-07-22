import * as actionTypes from "./actionTypes";

export const signup = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        const { password, ...userInfo } = newUser;
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            ...userInfo,
            initials: newUser.fullName[0],
          });
      })
      .then((response) => {
        dispatch({ type: actionTypes.SIGNUP_SUCCESS });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.SIGNUP_FAILURE, error });
      });
  };
};

export const login = (user) => {
  return async(dispatch, state, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const snapshot = await firestore.collection('users').where('studentUniqueNumber','==', parseInt(user.emailOrStudentUniqueNumber)).get();
    let studentEmail;
    if(snapshot.empty) studentEmail = user.emailOrStudentUniqueNumber;
    else snapshot.forEach(doc => {
      studentEmail = doc.data().email;
    });
    

    firebase
      .auth()
      .signInWithEmailAndPassword(studentEmail, user.password)
      .then((doc) => {
        console.log('iddddd: ',doc.id );
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          response: {message: 'success'}
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.LOGIN_FAILURE,
          error
        })
      })
  };
};
