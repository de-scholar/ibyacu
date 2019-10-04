import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import store from '../store';

/**IMPORTING STYLES */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../resources/static/frontend/styles/public/ibyacu-custom-style.css';
import { Container, Row } from 'reactstrap';

/**IMPORTING COMPONENTS AND LAYOUTS */
import NavBar from './layouts/NavBar';
import StoryPosting from './layouts/StoryPost';
import UserProfile from './layouts/UserProfile';

/**icons */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEject, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';

/**===ADDING ICONS ON LIBRARY SO THEY
 * WILL BE ABLE TO BE USED IN THE APP=== */
library.add(faEject);
library.add(faEye);
library.add(faEdit);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <NavBar />
            {/** ROUTES */}

            <div className="custom-body wrap-content">
              <Row>
                <Route
                  exact={true}
                  path="/make-a-tory-to-post"
                  component={StoryPosting}
                />
                <Route
                  exact={true}
                  path="/user-profile"
                  component={UserProfile}
                />

              </Row>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
