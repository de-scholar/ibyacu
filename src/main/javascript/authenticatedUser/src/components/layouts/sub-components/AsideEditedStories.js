import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cutDefaultTym } from "../../../functions/handlers";

export class AsideEditedStories extends Component {
  static propTypes = {
    dataFromDb: PropTypes.object.isRequired
  };

  render() {
    const { dataFromDb } = this.props;
    const userDetails = dataFromDb.userDetails;
    let listOfEdits;
    if (userDetails !== undefined) {
      const edits = userDetails.listOfEditedStories;
      listOfEdits = edits.map(edit => {
        return (
          <div key={edit.storyId}>
            <div className="bordered-element">
              <div className="light-purple-element">
                <strong>{edit.storyTitle}</strong>
                <br />
              </div>
              <div>
                <p className="w-100 hand-cursor small-textview">
                  {edit.storyContent}
                </p>
              </div>
              <div className="form-inline text-12 text-center green-element">
                <span className="m-1">
                  {" "}
                  <FontAwesomeIcon icon="edit" className="ml-2" />{" "}
                  {cutDefaultTym(edit.addedOnDateTime)}
                </span>
              </div>
            </div>
            <br />
          </div>
        );
      });
    } else {
      <div className="field-error">Login to get your Edits</div>;
    }
    return <div>{listOfEdits}</div>;
  }
}

const mapStateToProps = state => ({
  dataFromDb: state.myReducers
});

export default connect(
  mapStateToProps,
  null
)(AsideEditedStories);
