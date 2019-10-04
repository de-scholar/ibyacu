import React, { Component, Fragment } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class AsideProfileDiv extends Component {
  static propTypes = {
    dataFromTheDb: PropTypes.object.isRequired
  };
  render() {
    const { dataFromTheDb } = this.props;
    const userDetails = dataFromTheDb.userDetails;
    let username, userFname, userLname, userEmail, userGender, userDateOfBirth;
    if (userDetails !== undefined) {
      username = userDetails.username;
      userFname = userDetails.userFName;
      userLname = userDetails.userLName;
      userEmail = userDetails.userEmail;
      userGender = userDetails.userGender;
      userDateOfBirth = userDetails.userDateOfBirth;
    }

    return (
      <Fragment>
        <Card>
          <CardHeader className="text-center">
            <h3 className="text-success">
              <strong>{username}</strong>
            </h3>
          </CardHeader>
          <CardBody>
            {userFname + " " + userLname}
            <br />
            <span className="text-12">
              <em>{userEmail}</em>
            </span>
            <br />
            <hr />
            {userGender}
            <br />
            <hr />
            {userDateOfBirth}
            <br />
            <hr />
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  dataFromTheDb: state.myReducers
});
export default connect(
  mapStateToProps,
  null
)(AsideProfileDiv);
