/**THIS IS THE FUNCTION WHICH HANDLES THE BLUR EVENT */
export const handleBlur = event => {
  event.preventDefault();
  const infoDiv = document.getElementById("info-div")
  infoDiv.classList.add("hidden-div");
  infoDiv.classList.remove("field-success");
  infoDiv.classList.remove("field-error");
  infoDiv.classList.remove("black-element");
  const currElement = event.target;
  if (currElement.value.length < 3) {
    currElement.classList.add("field-error");
  } else {
    currElement.classList.remove("field-error");
  }
};
