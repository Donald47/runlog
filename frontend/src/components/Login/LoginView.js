import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Authentication from '../../network/Authentication'
const formStyle = {
  marginLeft: '5%',
}
const buttonStyle = {
 marginLeft: 15,
};
class LoginView extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  render() {
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
          <RaisedButton label="Submit" primary={true} style={buttonStyle} onClick={(event) => this.login(event)}/>
        </div>
      </div>
    );
  }
  async login(event) {
    const result = await Authentication.login(this.state.email, this.state.password);
    debugger;
  }
}
export default LoginView;
