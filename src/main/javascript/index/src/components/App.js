/**IMPORT STYLES */
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../resources/static/frontend/styles/public/ibyacu-custom-style.css";

/**IMPORT COMPONENTS */
import React, { Component, Fragment } from "react";
import { Container, Row } from "reactstrap";

export class App extends Component {
  render() {
    return (
      <Fragment>
        <Container>
          <Row>
            <a href="/signup-or-login">Login or Signup</a>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default App;
