import React, { Component, Fragment } from "react";
import {
  Row,
  Navbar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Form,
  Button
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaEdit, FaPlus } from 'react-icons/fa'
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserDetails } from "../../actions/retrieveAndSendDataToDB";

export class NavBar extends Component {
  state = {
    isTogglerOpen: false
  };
  handleToggler = () => {
    this.setState({ isTogglerOpen: !this.state.isTogglerOpen });
  };
  handleSettingsClicked = event => {
    event.preventDefault();
  };
  static propTypes = {
    getUserDetails: PropTypes.func.isRequired,
    dataFromDb: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.getUserDetails();
  }

  render() {
    const { dataFromDb } = this.props;
    const currUserDetails = dataFromDb.userDetails;
    let currUsername, currUserAuthorities;
    if (currUserDetails === undefined) {
      /**do nothing */
    } else {
      currUsername = currUserDetails.username;
      currUserAuthorities = currUserDetails.userAuthorities;
    }

    return (
      <Fragment>
        <Navbar dark expand="md" className="bg-custom sticky-element">
          <NavbarBrand href="/">IBYACU</NavbarBrand>
          <NavbarToggler onClick={this.handleToggler}></NavbarToggler>
          <Collapse
            isOpen={this.state.isTogglerOpen}
            navbar
            className="text-white"
          >
            <Nav className="form-inline ml-auto" navbar>
              <Row>
                <div className="col-md-4">
                  <NavLink
                    to="/make-a-tory-to-post"
                    className="text-white no-underline-on-hover"
                  >
                    <FaPlus />{" "}
                    Add Story
                  </NavLink>
                </div>
                <div className="col-md-4">
                  <NavLink to="/make-a-tory-to-post">Post a story</NavLink>
                </div>

                <div className="col-md-4">
                  <NavLink to="/make-a-tory-to-post">Post a story</NavLink>
                </div>
              </Row>
            </Nav>

            <Nav className="form-inline ml-auto" navbar>
              <Row>
                <div className="col-md-2 ml-3">
                  <NavLink to="#">Stories</NavLink>
                </div>
                <div className="col-md-2 ml-3">
                  <NavLink to="#">Stories</NavLink>
                </div>
                <div className="col-md-2 ml-3">
                  <strong>
                    <NavLink
                      to="/user-profile"
                      className="text-white-50 no-underline-on-hover"
                    >
                      {currUsername}
                    </NavLink>
                  </strong>
                </div>
                <div className="col-md-4 ml-3">
                  <Form action="/logout" method="GET">
                    <Button
                      type="submit"
                      className="btn-danger rounded-corner btn-sm"
                    >
                      <FontAwesomeIcon icon="eject" /> <strong> Logout</strong>
                    </Button>
                  </Form>
                </div>
              </Row>
            </Nav>
          </Collapse>
        </Navbar>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  dataFromDb: state.myReducers
});

export default connect(
  mapStateToProps,
  { getUserDetails }
)(NavBar);
