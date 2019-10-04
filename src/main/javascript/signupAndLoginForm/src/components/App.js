/**IMPORTING STYLES */
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../resources/static/frontend/styles/public/ibyacu-custom-style.css";

/**OTHER IMPORTING */
import { Provider } from "react-redux";
import store from "../store";

/**ICONS */
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCogs } from "@fortawesome/free-solid-svg-icons";

/**===ADDING ICONS ON LIBRARY SO THEY WILL BE ABLE TO BE USED IN THE APP=== */
library.add(faCogs);

/**IMPORTING COMPONENTS */
import React, { Component, Fragment } from "react";
import { Container, Row } from "reactstrap";
import NavBar from "./NavBar";
import SignupForm from "./forms/SignupForm";

export class App extends Component {
  render() {
    return (
      <Fragment>
        <Provider store={store}>
          <NavBar />
          <Container>
            <Row>
              <SignupForm />
            </Row>
          </Container>
        </Provider>
      </Fragment>
    );
  }
}

export default App;