import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginView from './components/Login/LoginView';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <Route exact path="/" component={LoginView} />
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
