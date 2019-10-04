import React, { Component, Fragment } from "react";
import { Container, Row, Button } from "reactstrap";
import { getCurrentDateTime, cutDefaultTym } from "../../functions/handlers";
import AsideProfileDiv from "./sub-components/AsideProfileDiv";
import AsideAddedStories from "./sub-components/AsideAddedStories";
import AsideDrafts from "./sub-components/AsideDrafts";
import {
  addStory,
  deleteStory,
  addDraft
} from "../../actions/retrieveAndSendDataToDB";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  FaEdit,
  FaTrash,
  FaBold,
  FaItalic,
  FaAlignJustify,
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight
} from "react-icons/fa";

export class StoryPost extends Component {
  state = {
    story_id: "",
    authorId: "",
    commentatorId: "",
    addedOnDateTime: "",
    numberOfReads: "",
    story_title: "",
    story_content: ""
  };

  static propTypes = {
    addStory: PropTypes.func.isRequired,
    deleteStory: PropTypes.func.isRequired,
    addDraft: PropTypes.func.isRequired,
    dataFromTheDb: PropTypes.object.isRequired
  };

  handleTyping(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   * DEALING WITH STORIES AND SEND BTN IN GENERAL
   *
   *
   */
  handleSendStoryClicked() {
    const { dataFromTheDb } = this.props;

    const userDetails = dataFromTheDb.userDetails; //TO GET USER DETAILS

    let storyId = this.state.story_id;
    let authorId = userDetails.userId;
    let editorId = userDetails.userId;
    let commentatorId = "";
    let numberOfReads = 0;
    let storyTitle = this.state.story_title;
    let storyContent = this.state.story_content;
    const addedOnDateTime = getCurrentDateTime();
    const editedOnDateTime = getCurrentDateTime();

    /**NEW STORY */
    if (storyId === "") {
      /**WHEN A TITLE IS EMPTY, REMIND A USER TO ENTER IT */
      if (storyTitle.length === 0) {
        storyTitle = "Posted on " + addedOnDateTime;
      }

      /**DEALING WITH CONTENT */
      if (storyContent.length !== 0) {
        const newStoryFormData = new FormData();
        newStoryFormData.append("storyId", null);
        newStoryFormData.append("authorId", authorId);
        newStoryFormData.append("editorId", editorId);
        newStoryFormData.append("commentatorId", commentatorId);
        newStoryFormData.append("addedOnDateTime", addedOnDateTime);
        newStoryFormData.append("editedOnDateTime", editedOnDateTime);
        newStoryFormData.append("numberOfReads", numberOfReads);
        newStoryFormData.append("storyTitle", storyTitle);
        newStoryFormData.append("storyContent", storyContent);

        this.props.addStory(newStoryFormData);
      } else {
        alert("Sorry, You can't submit an empty story!");
      }
    } else {
      /**STORY TO EDIT */
      /**WHEN A TITLE IS EMPTY, REMIND A USER TO ENTER IT */
      if (storyTitle.length === 0) {
        storyTitle = "Edited on " + addedOnDateTime;
      }

      /**DEALING WITH CONTENT */
      if (storyContent.length !== 0) {
        const newStoryFormData = new FormData();
        newStoryFormData.append("storyId", this.state.story_id);
        newStoryFormData.append("authorId", this.state.authorId);
        newStoryFormData.append("editorId", editorId);
        newStoryFormData.append("commentatorId", this.state.commentatorId);
        newStoryFormData.append(
          "addedOnDateTime",
          cutDefaultTym(this.state.addedOnDateTime)
        );
        newStoryFormData.append("editedOnDateTime", getCurrentDateTime());
        newStoryFormData.append("numberOfReads", this.state.numberOfReads);
        newStoryFormData.append("storyTitle", storyTitle);
        newStoryFormData.append("storyContent", storyContent);

        console.log(cutDefaultTym(this.state.addedOnDateTime));
        this.props.addStory(newStoryFormData);
      } else {
        alert("Sorry, You can't submit an empty story!");
      }
    }
  }

  handleStoryClicked(
    storyListingContainer,
    storyId,
    authorId,
    commentatorId,
    addedOnDateTime,
    numberOfReads,
    storyTitle,
    storyContent
  ) {
    const profileDiv = document.getElementById("profileDiv");
    const toolsDiv = document.getElementById("toolsDiv");
    const editStoryDiv = document.getElementById("editStoryDiv");
    const storiesAndDraftDiv = document.getElementById("storiesAndDraftDiv");
    const storyContentDiv = document.getElementById("storyContentDiv");
    const editionDiv = document.getElementById("editionDiv");
    const storyTitleSpan = document.getElementById("story-title-span");
    const storyContentSpan = document.getElementById("story-content-span");

    storiesAndDraftDiv.classList.remove("col-md-5");
    storiesAndDraftDiv.classList.add("col-md-4");
    storyListingContainer.classList.remove("width-wide");
    storyListingContainer.classList.add("width-full");
    editionDiv.classList.remove("col-md-9");
    editionDiv.classList.add("col-md-12");
    profileDiv.classList.add("hidden-div");
    toolsDiv.classList.add("hidden-div");
    editStoryDiv.classList.add("hidden-div");
    storyContentDiv.classList.remove("hidden-div");
    storyTitleSpan.innerHTML = storyTitle;
    storyContentSpan.innerHTML = storyContent;
    this.setState({
      story_id: storyId,
      authorId: authorId,
      commentatorId: commentatorId,
      addedOnDateTime: addedOnDateTime,
      numberOfReads: numberOfReads,
      story_title: storyTitle,
      story_content: storyContent
    });
  }

  handleStoryMouseEntered = () => {
    const controlsDiv = document.getElementById("controlsDiv");
    controlsDiv.classList.remove("hidden-div");
  };
  handleStoryMouseOut = () => {
    const controlsDiv = document.getElementById("controlsDiv");
    controlsDiv.classList.add("hidden-div");
  };
  handleEditButtonClicked = () => {
    const profileDiv = document.getElementById("profileDiv");
    const toolsDiv = document.getElementById("toolsDiv");
    const editStoryDiv = document.getElementById("editStoryDiv");
    const storyContentDiv = document.getElementById("storyContentDiv");
    const editionDiv = document.getElementById("editionDiv");

    profileDiv.classList.remove("hidden-div");
    toolsDiv.classList.remove("hidden-div");
    editStoryDiv.classList.remove("hidden-div");
    storyContentDiv.classList.add("hidden-div");
    editionDiv.classList.add("col-md-9");
    editionDiv.classList.remove("col-md-12");
  };
  handleDeleteBtnClicked = () => {
    const storyTitle = this.state.story_title;
    const storyId = this.state.story_id;
    this.props.deleteStory(storyTitle, storyId);
  };

  /**
   *
   * DEALING WITH SAVE AS DRAFT
   *
   *
   */
  handleSaveAsDraftClicked = () => {
    const { dataFromTheDb } = this.props;

    const userDetails = dataFromTheDb.userDetails; //TO GET USER DETAILS

    let storyId = this.state.story_id;
    let authorId = userDetails.userId;
    let editorId = userDetails.userId;
    let storyTitle = this.state.story_title;
    let storyContent = this.state.story_content;
    const addedOnDateTime = getCurrentDateTime();
    const editedOnDateTime = getCurrentDateTime();

    if (storyId === "") {
      /**New Story */
      if (storyTitle === "") {
        storyTitle = "Draft of " + addedOnDateTime;
      }
      if (storyContent.length !== 0) {
        const newDraft = new FormData();

        newDraft.append("storyId", null);
        newDraft.append("authorId", authorId);
        newDraft.append("editorId", editorId);
        newDraft.append("addedOnDateTime", addedOnDateTime);
        newDraft.append("editedOnDateTime", editedOnDateTime);
        newDraft.append("storyTitle", storyTitle);
        newDraft.append("storyContent", storyContent);

        this.props.addDraft(newDraft);
      } else {
        alert("You cannot save an empty draft");
      }
    } else {
      /**Edit Story */
      if (storyTitle === "") {
        storyTitle = "Draft of " + addedOnDateTime;
      }
      if (storyContent.length !== 0) {
        const editDraftFormData = new FormData();

        editDraftFormData.append("storyId", storyId);
        editDraftFormData.append("authorId", authorId);
        editDraftFormData.append("editorId", editorId);
        editDraftFormData.append("addedOnDateTime", addedOnDateTime);
        editDraftFormData.append("editedOnDateTime", editedOnDateTime);
        editDraftFormData.append("storyTitle", storyTitle);
        editDraftFormData.append("storyContent", storyContent);

        this.props.addDraft(editDraftFormData);
      } else {
        alert("You cannot save an empty draft");
      }
    }
  };
  render() {
    return (
      <Fragment>
        <Row>
          <div id="profileDiv" className="col-md-3 heigth-full">
            <AsideProfileDiv />
          </div>
          <div id="editionDiv" className="col-md-9 heigth-full">
            <Row>
              {/**THIS IS WHERE TO DISPLAY A STORY CONTENT WHEN A USER NEEDS TO READ A STORY */}
              <div
                id="storyContentDiv"
                className="wrap-content light-purple-element col-md-8 hidden-div"
              >
                <div
                  onPointerEnter={this.handleStoryMouseEntered}
                  onMouseLeave={this.handleStoryMouseOut}
                  className="wrap-content"
                >
                  <h1 className="text-center blue-element">
                    <span id="story-title-span"></span>
                  </h1>
                  <span className="wrap-content" id="story-content-span"></span>
                  <div
                    className="row p-1 rounded-corner transparent-background 
                      fixed-bottom-center-element hidden-div justify-content-center"
                    id="controlsDiv"
                  >
                    <button
                      onClick={this.handleEditButtonClicked}
                      className="rounded-corner col-md-6 btn btn-outline-warning btn-lg"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={this.handleDeleteBtnClicked}
                      className="rounded-corner col-md-6 btn btn-outline-danger btn-lg"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
              {/**END OF STORY CONTENT DIV WHEN A USER NEEDS TO READ A STORY */}

              <div
                id="toolsDiv"
                className="col-md-1 bordered-element w-100  heigth-full px-0 py-0"
              >
                <h4>Tools</h4>
                <div>
                  <span className="mr-1">
                    <FaBold />
                  </span>
                  <span className="mr-1">
                    <FaItalic />
                  </span>
                  <span className="mr-1">
                    <FaAlignJustify />
                  </span>
                  <span className="mr-1">
                    <FaAlignCenter />
                  </span>
                  <span className="mr-1">
                    <FaAlignLeft />
                  </span>
                  <span className="mr-1">
                    <FaAlignRight />
                  </span>
                  <Button>tool 7</Button>
                  <Button>tool 8</Button>
                  <Button>tool 9</Button>
                  <Button>tool 10</Button>
                  <Button>tool 11</Button>
                  <Button>tool 12</Button>
                </div>
              </div>
              <div id="editStoryDiv" className="col-md-6 heigth-full">
                <textarea
                  name="story_title"
                  placeholder="Your story title here..."
                  cols="40"
                  rows="3"
                  className="w-100 bordered-element"
                  onChange={this.handleTyping}
                  value={this.state.story_title}
                />
                <textarea
                  cols="40"
                  rows="15"
                  placeholder="Enter your story here ..."
                  className="w-100 bordered-element"
                  name="story_content"
                  onChange={this.handleTyping}
                  value={this.state.story_content}
                />
                <Row>
                  <div className="bordered-element form-inline w-100">
                    <div
                      onClick={this.handleSaveAsDraftClicked}
                      className="col-md-6 hand-cursor text-12 padding-10 text-center orange-element"
                    >
                      Save as draft
                    </div>
                    <div
                      onClick={this.handleSendStoryClicked}
                      className="col-md-6 hand-cursor text-12 padding-10 text-center green-element"
                    >
                      Populate this story
                    </div>
                  </div>
                </Row>
              </div>
              <div id="storiesAndDraftDiv heigth-full" className="col-md-5">
                <Row className="heigth-25 overflow-auto ">
                  <div className="w-100 col-md-12">
                    <h4 className="sticky-element">My Stories</h4>
                    <AsideAddedStories
                      handleStoryClicked={this.handleStoryClicked}
                    />
                  </div>
                </Row>
                <Row className="heigth-25 overflow-auto">
                  <div className="w-100 col-md-12">
                    <h4>My Drafts</h4>
                    <AsideDrafts />
                  </div>
                </Row>
              </div>
            </Row>
          </div>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  dataFromTheDb: state.myReducers
});

export default connect(
  mapStateToProps,
  { addStory, deleteStory, addDraft }
)(StoryPost);
