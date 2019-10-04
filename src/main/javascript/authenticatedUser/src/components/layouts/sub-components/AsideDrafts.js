import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cutDefaultTym } from "../../../functions/handlers";

export class AsideDrafts extends Component {
  static propTypes = {
    dataFromDb: PropTypes.object.isRequired
  };

  render() {
    const { dataFromDb } = this.props;
    const userDetails = dataFromDb.userDetails;
    let listOfDrafts;
    if (userDetails !== undefined) {
      const drafts = userDetails.listOfDraftStories;
      listOfDrafts = drafts.map(draft => {
        return (
          <div key={draft.storyId}>
            <div className="bordered-element">
              <div className="light-purple-element">
                <strong>{draft.storyTitle}</strong>
                <br />
              </div>
              <div>
                <p className="w-100 hand-cursor small-textview">
                  {draft.storyContent}
                </p>
              </div>
              <div className="form-inline text-12 text-center green-element">
                <span className="m-1">
                  {" "}
                  <FontAwesomeIcon icon="edit" className="ml-2" />{" "}
                  {cutDefaultTym(draft.addedOnDateTime)}
                </span>
              </div>
            </div>
            <br />
          </div>
        );
      });
    } else {
      listOfDrafts = (
        <div className="field-error">Login to get your Drafts</div>
      );
    }

    return <div>{listOfDrafts}</div>;
  }
}

const mapStateToProp = state => ({
  dataFromDb: state.myReducers
});

export default connect(
  mapStateToProp,
  null
)(AsideDrafts);
