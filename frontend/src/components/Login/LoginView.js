import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Authentication from '../../network/Authentication';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const formStyle = {
  width: '256px',
  marginLeft: '5%',
};
const buttonStyle = {
  marginLeft: '15px',
};
const errorStyle = {
  marginTop: '5px',
  marginBottom: '5px',
  paddingLeft: '15px',
  outlineStyle: 'solid',
  color: '#cc0000',
};

class LoginView extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: 'hello@test.com',
      password: 'password',
      errorMessage: null,
      loggedIn: false,
    };
  }

  login = async () => {
    const result = await Authentication.login(this.state.email, this.state.password);
    if (result.status === 200) {
      this.setState({loggedIn:true});
    } else {
      this.setState({errorMessage:result.message});
    }
  }

  render() {
    if (this.state.loggedIn) {
      return (<Redirect to='/runs' />)
    }
    return (
      <div>
        <AppBar title="Login" showMenuIconButton={false} />
        <div style={formStyle}>
          <TextField
            hintText="Enter your Email"
            floatingLabelText="Email"
            onChange = {(event,newValue) => this.setState({email:newValue})}
          />
          <br/>
          <TextField
            className="LoginField"
            type="password"
            hintText="Enter your Password"
            floatingLabelText="Password"
            onChange = {(event,newValue) => this.setState({password:newValue})}
          />
          <br/>
          {this.state.errorMessage !== null && <div style={errorStyle}>{this.state.errorMessage}</div>}
          <RaisedButton label="Submit" primary={true} style={buttonStyle} onClick={this.login}/>
        </div>
      </div>
    );
  }
}
export default LoginView;
