import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Card, CardHeader, CardBody } from "reactstrap";
import AsideProfileDiv from "./sub-components/AsideProfileDiv";
import AsideAddedStories from "./sub-components/AsideAddedStories";
import AsideDrafts from "./sub-components/AsideDrafts";
import AsideEditedStories from "./sub-components/AsideEditedStories";
import AsideCommentedStories from "./sub-components/AsideCommentedStories";
import AllStories from "./AllStories";

export class UserProfile extends Component {
  static propTypes = {
    dataFromDb: PropTypes.object.isRequired
  };
  componentDidMount() { }
  render() {
    const { dataFromDb } = this.props;
    const userDetails = dataFromDb.userDetails;
    let username, userFname, userLname, userDateOfBirth, userEmail, userGender;
    if (userDetails !== undefined) {
      username = userDetails.username;
      userFname = userDetails.userFName;
      userLname = userDetails.userLName;
      userDateOfBirth = userDetails.userDateOfBirth;
      userGender = userDetails.userGender;
      userEmail = userDetails.userEmail;
    }
    return (
      <Fragment>
        <Row>
          <div className="col-md-3">
            <AsideProfileDiv />
          </div>
          <div className="col-md-9">
            <Row className="heigth-10 overflow-auto mb-2">
              <div className="col-md-8">
                <h3>All of Stories</h3>
                <AllStories />
              </div>
              <div className="col-md-4">
                <h3>My Stories</h3>
                <AsideAddedStories
                  handleStoryListingAndView={this.handleStoryListingAndView}
                />
              </div>
            </Row>
            <Row className="heigth-10 overflow-auto mb-2">
              <div className="col-md-4">
                <h3>My Drafts</h3>
                <AsideDrafts />
              </div>
              <div className="col-md-4">
                <h3>My edits</h3>
                <AsideEditedStories />
              </div>
              <div className="col-md-4">
                <h3>My commented stories</h3>
                <AsideCommentedStories />
              </div>
            </Row>
          </div>
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  dataFromDb: state.myReducers
});
export default connect(
  mapStateToProps,
  null
)(UserProfile);
