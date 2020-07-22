import React, { useState } from "react";
import "../assets/styles/styles.scss";
import "../assets/styles/components/modal.scss";
import Btn from "./Btn";
import InputField from "./InputField";
import { Button, Badge, Form } from "react-bootstrap";
import addToArrIfNotExist from '../helpers/addElementToArrIfNotExists';
import removeElementFromArr from '../helpers/removeElementFromArr';
import {sendInvitations} from '../redux/actions/instructorActions';
import {connect} from 'react-redux';
import {addElementToEachObjectInArr,findObjFromArr,getSomeFieldsOfObjects} from '../helpers/utils';
import { Spinner } from 'react-bootstrap';
import {updateCourseMembers} from '../redux/actions/coursesActions';

const Modal = ({
  header,
  bodyTitle,
  inputPlaceholder,
  footerBtnName,
  footerBtnLabel,
  show,
  data,
  sender,
  sendInvitations,
  allMembers,
  updateCourseMembers
}) => {
  const [isModalToggled, toggleModal] = useState(false);
  const [invitationMethod,setInvitationMethod] = useState();
  const [selectedMembers,updateMembers] = useState([]);
  const [section,setSection] = useState({});
  const [isLoading, setIsLoading] = useState('');

  

  const handleClick = (target) => {
    if(target.id === 'invitation'){
      const invitationStatus = {status:'pending'};
      const formatedSelectedMembers = formatSelectedMembersObj(allMembers,selectedMembers,{...section,...invitationStatus});
      sendInvitations(sender, localStorage.getItem('courseName'), selectedMembers);
      updateCourseMembers(localStorage.getItem('courseId'),formatedSelectedMembers);
    }
    if (target.className === "x") toggleModal(!isModalToggled);
    else if((target.className).includes('badge')){
      updateMembers(removeElementFromArr(selectedMembers,target.id));
    }
  };
  const handleChange = (target) => {
    if(target.name === 'method') setInvitationMethod(target.value);
    else if (target.name === "members") updateMembers(addToArrIfNotExist(selectedMembers,target.value));
    else if (target.name === 'sections')  setSection({section: target.value})
  }
  const displaySelectedMembers = (selectedMembers) => {
   return  selectedMembers.map(member => {
      return (
        <div className="modal__btn--with--badge">
          <span >{member}</span>
            <Badge variant="danger" id={member} className="badge" onClick={(event) => handleClick(event.target)}>x</Badge>
      </div>
      )
    });
  }
  const formatSelectedMembersObj = (allMembers,selectedMembers,newElement) => {
    const selectedMembersObj= findObjFromArr(allMembers,selectedMembers);
    const selectedMembersWithTheirSections =  addElementToEachObjectInArr(selectedMembersObj,newElement);
    return getSomeFieldsOfObjects(selectedMembersWithTheirSections,['fullName','studentUniqueNumber','role','section','status'])
  }
  return (
    <>
    <Spinner
            animation="border"
            variant="primary"
            className={isLoading ? 'spinner--position__center' : 'hide'}
            />
      <div
        className={`modal ${
          (show && !isModalToggled) || (!show && isModalToggled)
            ? "show"
            : "hide"
        }`}
        id="newAssignmentModal"
      >
      <div className="modal show">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title m-title pl-2">
                {header}
              </h6>
              <button
                type="button"
                className="close"
                onClick={(event) => handleClick(event.target)}
              >
                <span aria-hidden="true" id="close" className="x">
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
            <div>
                <h3>Select members from the list</h3>
                {/* <InputField type="radio" radioInputs={
                 [ {
                    name: 'method',
                    value: 'SUN',
                    label: 'Student Unique Number',
                  },
                  {
                    name: 'method',
                    value: 'email',
                    label: 'email address'
                  }]
                } handleChange={handleChange}/> */}
              </div>
            {/* <div className="method__email">
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example: lohan@instituteofprogramming.com,clement@coders.com</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group>
                Select role:
              <InputField 
                  type="select" 
                  id="roles" 
                  name="roles" 
                  selectOptions={[
                      {label:'student' , value:'student' }, 
                      {label:'instructor' , value:'instructor' }, 
                  ]} 
                  className="input__medium" 
                  handleChange={handleChange} 
              />
              Select section:
              <InputField 
                  type="select" 
                  id="sections" 
                  name="sections" 
                  selectOptions={[
                      {label:'Intro to JS' , value:'intro to JS' }, 
                      {label:'History of JS' , value:'history of JS' }, 
                  ]} 
                  className="input__medium" 
                  handleChange={handleChange} 
              />
            </div> */}
            <div className="method__SUN">
              {/* <div className="modal__btn--with--badge">
                      <span >Imena Ingenzi</span>
                       <Badge variant="danger" id="Imena" className="badge" onClick={(event) => handleClick(event.target)}>x</Badge>
                  </div> */}
                  <div className="modal--selected">
                    {displaySelectedMembers(selectedMembers)}
                  </div>
                  <div>
              <div className="row pl-2 pr-2">
                <div className="col-md-6">
                    <InputField
                      type="select"
                      id="members"
                      name="members"
                      selectOptions={data}
                      className="input__large"
                      handleChange={handleChange}
                    />
                  </div>
                </div>
                SELECT A SECTION:
                <InputField 
                  type="select" 
                  id="sections" 
                  name="sections" 
                  selectOptions={[
                      {label:'select from the list' , value:'' },
                      {label:'Intro to JS' , value:'intro to JS' }, 
                      {label:'History of JS' , value:'history of JS' }, 
                  ]} 
                  className="input__medium" 
                  handleChange={handleChange} 
              />
              </div>
            </div>
            </div>
            <div className="modal-footer">
              <Btn
                name={footerBtnName}
                label={footerBtnLabel}
                handleClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  // console.log('state.students ', state.students);
  console.log('state: ', state);
  return {
    loading: state.auth.loading,
    sender: state.firebase.profile.fullName,
    fetchError : state.students.error,
    allMembers: state.students.allMembers,
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    sendInvitations: (sender, course, members) => dispatch(sendInvitations(sender, course, members)),
    updateCourseMembers: (courseId,membersIds) => dispatch(updateCourseMembers(courseId,membersIds))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Modal)
