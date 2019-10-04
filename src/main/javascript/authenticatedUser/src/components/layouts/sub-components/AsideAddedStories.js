import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cutDefaultTym } from "../../../functions/handlers";
import { Link } from "react-router-dom";

let storyTitle, storyContent, addedOnDateTime, editedOnDateTime;
export class AsideAddedStories extends Component {
  state = { storyContent: "" };
  static propTypes = {
    dataFromDb: PropTypes.object.isRequired
  };
  componentDidMount() { }

  render() {
    const { dataFromDb } = this.props;
    const userDetails = dataFromDb.userDetails; //user details contains written stories array
    const writtenStories = userDetails.listOfWrittenStories;
    const listOfStries = writtenStories.map(story => {
      return (
        <div key={story.storyId}>
          <div className="bordered-element">
            <div className="light-purple-element">
              <strong>{story.storyTitle}</strong>
              <br />
            </div>
            <div>
              <p
                onClick={() => {
                  const storyListingContainer = document.getElementById(
                    "storyListingContainer"
                  );
                  this.props.handleStoryClicked(
                    storyListingContainer,
                    story.storyId,
                    story.authorId,
                    story.commentatorId,
                    story.addedOnDateTime,
                    story.numberOfReads,
                    story.storyTitle,
                    story.storyContent
                  );
                }}
                className="w-100 hand-cursor small-textview"
              >
                {story.storyContent}
              </p>
            </div>
            <div className="form-inline text-12 text-center green-element">
              <span className="m-1">
                {" "}
                <FontAwesomeIcon icon="edit" className="ml-2" />{" "}
                {cutDefaultTym(story.addedOnDateTime)}
              </span>
              <span className="m-1">
                <FontAwesomeIcon icon="eye" className="ml-2" />{" "}
                {story.numberOfReads}
              </span>
            </div>
          </div>
          <br />
        </div>
      );
    });
    return (
      <Fragment>
        <div id="storyListingContainer">
          {listOfStries}
        </div>
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
)(AsideAddedStories);
