export const getCurrentDateTime = () => {
  const rightNow = new Date();

  const currYear = rightNow.getFullYear();
  const currMonth = rightNow.getMonth() + 1;
  const currDate = rightNow.getDate();
  const currHour = rightNow.getHours();
  const currMinutes = rightNow.getMinutes();
  const currSecs = rightNow.getSeconds();

  return (
    currYear +
    "-" +
    currMonth +
    "-" +
    currDate +
    " " +
    currHour +
    ":" +
    currMinutes +
    ":" +
    currSecs
  );
};

export const cutDefaultTym = defaultTym => {
  const defaultDateTymArr = defaultTym.split("T");
  const defaultDate = defaultDateTymArr[0];
  const defaultTymArr = defaultDateTymArr[1].split(".");
  const defaultRealTym = defaultTymArr[0];

  return defaultDate + " " + defaultRealTym;
};
export const addAuthorsAndEditors = (allStories, listOfAuthors) => {
  for (let i = 0; i < allStories.length; i++) {
    for (let j = 0; j < listOfAuthors.length; j++) {
      if (allStories[i].authorId === listOfAuthors[j].userId) {
        allStories[i].authorName = listOfAuthors[j].username;
      }
      if (allStories[i].editorId === listOfAuthors[j].userId) {
        allStories[i].editorName = listOfAuthors[j].username;
      }
    }
  }
}