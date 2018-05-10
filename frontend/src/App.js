import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginView from './components/Login/LoginView';
import RunsView from './components/Runs/RunsView';
import Authentication from './network/Authentication';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Authentication.hasToken()
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Route exact path="/" component={LoginView} />
            <AuthRoute exact path="/runs" component={RunsView} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
