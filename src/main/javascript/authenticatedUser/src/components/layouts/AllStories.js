import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllStories } from "../../actions/retrieveAndSendDataToDB";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cutDefaultTym, addAuthorsAndEditors } from "../../functions/handlers";

import { FaUser } from "react-icons/fa";

export class AllStories extends Component {
  static propTypes = {
    getAllStories: PropTypes.func.isRequired,
    dataFromDb: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getAllStories();
  }

  render() {
    let { dataFromDb } = this.props;
    let allStories = dataFromDb.allStories;
    let listOfStories;
    if (allStories !== undefined) {
      /** */
      const listOfAuthors = dataFromDb.returnedUser;
      if (listOfAuthors !== undefined) {
        addAuthorsAndEditors(allStories, listOfAuthors);
      }

      /** */
      listOfStories = allStories.map(story => {
        return (
          <div key={story.storyId}>
            <div className="bordered-element">
              <div className="light-purple-element">
                <strong>{story.storyTitle}</strong>
                <br />
              </div>
              <div>
                <p className="w-100 hand-cursor small-textview">
                  {story.storyContent}
                </p>
              </div>
              <div className="form-inline text-12 text-center green-element">
                <span className="m-1">
                  {" "}
                  <FontAwesomeIcon icon="edit" className="ml-2" />{" "}
                  {cutDefaultTym(story.addedOnDateTime)}
                </span>
                <span className="m-1"> {"story by : " + story.authorName}</span>
                <span className="m-1">
                  {" "}
                  {"edited by : " + story.editorName}
                </span>
              </div>
            </div>
            <br />
          </div>
        );
      });
    } else {
      listOfStories = (
        <div className="field-error">Login to get your Drafts</div>
      );
    }
    return <div>{listOfStories}</div>;
  }
}

const mapStateToProps = (state) => ({
  dataFromDb: state.myReducers,
});
export default connect(
  mapStateToProps,
  { getAllStories },
)(AllStories);
