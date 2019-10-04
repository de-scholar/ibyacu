import React, { Component, Fragment } from "react";
import {
  Row,
  Navbar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Form,
  Input,
  Button
} from "reactstrap";

export class NavBar extends Component {
  state = {
    isTogglerOpen: false
  };
  handleToggler = () => {
    this.setState({ isTogglerOpen: !this.state.isTogglerOpen });
  };
  handleSettingsClicked = event => {
    event.preventDefault();
  };
  render() {
    return (
      <Fragment>
        <Navbar dark expand="md" className="bg-custom sticky-element">
          <NavbarBrand href="/">IBYACU</NavbarBrand>
          <NavbarToggler onClick={this.handleToggler}></NavbarToggler>
          <Collapse
            isOpen={this.state.isTogglerOpen}
            navbar
            className="text-white"
          >
            <Nav className="form-inline ml-auto" navbar>
              <Row>
                <div className="col-md-12">
                  <Form action="login" method="POST">
                    <Input
                      type="text"
                      placeholder="username"
                      className="rounded-corner form-control-sm col-md-5"
                      name="username"
                    />
                    <Input
                      type="password"
                      placeholder="password"
                      className="rounded-corner form-control-sm col-md-5"
                      name="password"
                    />
                    <Button
                      type="submit"
                      className="btn-success rounded-corner btn-sm col-md-2"
                    >
                      Injira
                    </Button>
                  </Form>
                </div>
              </Row>
            </Nav>
          </Collapse>
        </Navbar>
      </Fragment>
    );
  }
}

export default NavBar;
