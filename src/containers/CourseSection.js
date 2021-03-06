import React, { useState, useEffect } from "react";
import SpecificCourse from "../components/SpecificCourse";
import "../assets/styles/containers/courseSection.scss";
import Modal from "../components/Modal";
import Btn from "../components/Btn";
import { connect } from "react-redux";
import { getCourseSections, getCourses } from "../redux/actions/coursesActions";
import { Spinner } from "react-bootstrap";
import TableLayout from "../components/TableLayout";
import DropDown from "../components/DropDown";
import { getMembers } from "../redux/actions/membersActions";

const CourseSection = (props) => {
  const [isToggled, toggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageRefreshed,setIsPageRefreshed] = useState('');
  const [dropDownState, setDropDownState] = useState(false);

  const { courses, members, match: { params }  } = props;
  useEffect(() => {
    setIsLoading(true)
    props.fetchCourses();
    props.getCourseSections(params.courseId, setIsLoading);
    props.getMembers(localStorage.getItem('courseId'));
  }, []);

  useEffect(() => {
    if(props.sections.length){
    setIsLoading(false);
  }
  }, [props.actionMessage,props.sections]);

  const handleClick = () => toggle(!isToggled);

  if(isPageRefreshed){
     window.location.reload(false);
     setIsPageRefreshed('');
    }

  const handleDropdown = (target) => {
    if (target.id === "dropdown") {
      setDropDownState(!dropDownState);
    }
  };
  const membersPerSection = (id) => {
    const allMembers = members.values.filter(({sectionId, status}) => sectionId === id && status === 'accepted');
    return allMembers.length;
  }
  const tableRows = props.sections;
  return (
    <SpecificCourse
      page={`${localStorage.getItem("courseName")} > Settings`}
      submenu="Settings"
    >
      <Spinner
        animation="border"
        variant="primary"
        className={isLoading ? "spinner--position__center" : "hide"}
      />
      <Btn
        name="section"
        label="Add section"
        handleClick={handleClick}
        className="members--btn__top blue-btn modal--btn"
      />
        <>
      <div className="col-md-8 section--body">
      <h6>COURSE SECTIONS</h6>
      <p>Create sections for different course offering intakes.</p>

        <div className="carded-table-scroll">  
        <TableLayout headers={['Name', 'ID', 'Academic Year', 'Start Date', 'End Date', 'Members', '']}>      
        {
          tableRows.length ? 
          tableRows.map((tableRow) => 
            <tr key={tableRow.sectionId}>
              <td>{tableRow.sectionName}</td>
              <td>{tableRow.sectionId}</td>
              <td>{tableRow.academicYear}</td>
              <td>{tableRow.startingDate}</td>
              <td>{tableRow.closingDate}</td>
              <td>{membersPerSection(tableRow.sectionId)}</td>
              <td>
                <DropDown handleClick={handleDropdown} rowId={tableRow.sectionId} />
              </td>
            </tr>
          )
        : <p>No data found</p>
        }
        </TableLayout>
        </div>
        </div>
        <div className="col reserved-side">
          <h5>Notifications</h5>
        </div>
        </>
      <Modal toggled={isToggled } />
    </SpecificCourse>
  );
};
const mapStateToProps = ({ courses, members }) => {
  return {
    courses: courses.values,
    sections: courses.sections,
    actionMessage: courses.message,
    members,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCourseSections: (courseId,setIsLoading,setIsPageRefreshed) => dispatch(getCourseSections(courseId,setIsLoading,setIsPageRefreshed)),
    fetchCourses: () => dispatch(getCourses()),
    getMembers: (courseId) => dispatch(getMembers(courseId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseSection);
