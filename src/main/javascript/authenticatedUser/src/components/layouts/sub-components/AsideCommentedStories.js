import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cutDefaultTym } from "../../../functions/handlers";

export class AsideCommentedStories extends Component {
  static propTypes = {
    dataFromDb: PropTypes.object.isRequired
  };

  render() {
    const { dataFromDb } = this.props;
    const userDetails = dataFromDb.userDetails;
    let listOfCommentStry;
    if (userDetails !== undefined) {
      const commentstry = userDetails.listOfCommentedStories;
      listOfCommentStry = commentstry.map(comment => {
        return (
          <div key={comment.storyId}>
            <div className="bordered-element">
              <div className="light-purple-element">
                <strong>{comment.storyTitle}</strong>
                <br />
              </div>
              <div>
                <p className="w-100 hand-cursor small-textview">
                  {comment.storyContent}
                </p>
              </div>
              <div className="form-inline text-12 text-center green-element">
                <span className="m-1">
                  {" "}
                  <FontAwesomeIcon icon="edit" className="ml-2" />{" "}
                  {cutDefaultTym(comment.addedOnDateTime)}
                </span>
              </div>
            </div>
            <br />
          </div>
        );
      });
    } else {
      listOfCommentStry = (
        <div className="field-error">Login to get your commented stories</div>
      );
    }

    return <div>{listOfCommentStry}</div>;
  }
}

const mapStateToProps = state => ({
  dataFromDb: state.myReducers
});

export default connect(
  mapStateToProps,
  null
)(AsideCommentedStories);
