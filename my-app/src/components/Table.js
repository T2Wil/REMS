import React from "react";
import "../assets/styles/components/table.scss";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

//tableRows ex: [['William','2015','student','JSF intro','Pending'],[],[]]
//tableRows ex: [{name: 'william', sun/email: '2015',role: 'student',section: 'JSF'}]
//tableHeaders ex: ['name','S.U.N','role']

const Table = (props) => {
  const { tableHeaders, tableRows } = props;
  
  const handleClick = (target) => {
    
  }

  const headers = tableHeaders.map((tableHeader) => {
    return (
      <div className="col col-md-6">
        <p className="card-text">{tableHeader}</p>
      </div>
    );
  });

  const rows = tableRows.map((row) => {
    //length of the row
    const numberOfRows = row.length;
    return row.map((col) => {
      const numberOfCols = col.length;
      //length of the cols
      //if on the row and last col
      return (
        <div>
          <div className="col table--row">
            <p className=" table--row--txt">{col}</p>
          </div>
          <div className="dropdown-no-caret float-right">
            {/* <Dropdown>
              <Dropdown.Toggle id="dropdown-button-drop-left">
                <div className="drop-menu">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={(event) => handleClick(event.target)}>
                  remove member
                </Dropdown.Item>
                <Dropdown.Item onClick={(event) => handleClick(event.target)}>
                  user details
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </div>
        </div>
      );
    });
  });
  return (
    <div>
      <div className="carded-table-header">{headers}</div>
      <div className="carded-table-scroll">
        <div className="card carded-table">
          <div className="card-body carded-table-body">{rows}</div>
        </div>
      </div>
    </div>
  );
};
export default Table;
