import React, { useEffect } from "react";
import "../../assets/styles/styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userGrey from '../../assets/images/avatars/userGrey.png';
import Indent50 from '../../assets/images/icons/Indent50.png';
import schoolImg from '../../assets/images/circle50.png';
import { NavLink } from "react-router-dom";
import { instructor, student } from "./menu";
import { connect } from "react-redux";

const Sidebar = (props) => {
	const {userProfile} = props;
	const menus = userProfile.role === 'instructor' ? instructor : student;
 
  return (
    <div >
			<div id="sidebar" className="sidebar">
				<div className="scrollbar-inner sidebar-wrapper">
						{/* We will retrieve all the info in db according to the user */}
						<div className="companyImg">
							<div className="photo">
								<img alt="" className="avatar rounded-circle" src={userProfile.schoolLogo ? userProfile.schoolLogo : schoolImg}/>
							</div>
							<span className="">{userProfile.school} </span>
						</div>
					<ul className="nav">
						{
							menus.map((menu, idx) => 
							
							<li className="nav-item" key={idx}>
							<NavLink to={menu.url} activeStyle={{color: "#FFCE31"}}>
								<FontAwesomeIcon icon={menu.icon} />
								<p className="pl-2">{menu.name}</p>
							</NavLink>
							</li>
							)
						}

						<li className="nav-item update-pro">
              <div className="left-sidebar-footer">
                <div className="left-sidebar-footer-block">
                  <div className="left-sidebar-footer-block-left">
                    <img className="avatar rounded-circle" alt="profile" src={userProfile.imageUrl ? userProfile.imageUrl : userGrey}/>
                  </div>
                  <div className="left-sidebar-footer-block-info">
                    <strong className="left-sidebar-footer-block-info-name">{ !userProfile.fullName ? '' : userProfile.fullName.length < 9 ? userProfile.fullName.substr(0, 9) : `${userProfile.fullName.substr(0, 7)}...`} </strong>
                    <p className="left-sidebar-footer-block-info-role">{userProfile.role}</p>
                  </div>
                  <div className="left-sidebar-footer-block-right">
                    <img  alt="" src={Indent50}/>
                  </div>
                </div>
              </div>
						</li>

					</ul>
				</div>
			</div>
		</div>
  );
};

const mapStateToProps = ({ firebase }) => {
	return {
	  userProfile: firebase.profile,
	}
  }

export default connect(mapStateToProps)(Sidebar);
