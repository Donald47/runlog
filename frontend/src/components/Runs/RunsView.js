import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { PulseLoader } from 'react-spinners'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Runs from '../../network/Runs';

const buttonStyle = {
  marginTop: '10px',
  marginLeft: '15px',
};
const errorStyle = {
  width: '300px',
  marginTop: '5px',
  marginBottom: '5px',
  paddingLeft: '15px',
  outlineStyle: 'solid',
  color: '#cc0000',
};

class RunsView extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
      loading: true,
      errorMessage: null,
      showInputs: false,
      draftRun: {
        distance_in_meters: 0.0,
        time_in_seconds: 0.0,
      },
      runs: [],
    };
  }
  async componentDidMount() {
    const result = await Runs.get();
    if (result.status !== 200) {
      const loggedIn = result.status === 401 ? false : true;
      this.setState({
        loggedIn,
        errorMessage: result.message,
      });
    } else {
      this.setState({ runs: result.runs, loading: false });
    }
  }

  showInputs = () => {
    this.setState({showInputs:true});
  }

  hideInputs = () => {
    this.setState({showInputs:false});
  }

  addNewRun = async () => {
    this.setState({ loading: true });
    const result = await Runs.post(this.state.draftRun);
    if (result.status !== 201) {
      const loggedIn = result.status === 401 ? false : true;
      this.setState({
        loggedIn,
        errorMessage: result.message,
        loading: false,
      });
    } else {
      this.setState({ runs: result.runs, loading: false });
    }
  }

  renderInputBlock = () => {
    const inputStyle = {
      marginLeft: "10px",
      width: "150px",
    };
    if (this.state.showInputs === false) {
      return (<RaisedButton label="Add Run" primary={true} style={buttonStyle} onClick={this.showInputs}/>);
    } else {
      return (
        <div>
          <TextField
            hintText="Distance"
            floatingLabelText="Distance in meters"
            floatingLabelFixed={true}
            type="number"
            style={inputStyle}
            onChange={(event,newValue) => {
              this.setState({draftRun:{
                distance_in_meters: newValue,
                time_in_seconds: this.state.draftRun.time_in_seconds,
              }})
            }}
          />
          <TextField
            hintText="Time"
            floatingLabelText="Time in seconds"
            floatingLabelFixed={true}
            type="number"
            style={inputStyle}
            onChange={(event,newValue) => {
              this.setState({draftRun:{
                distance_in_meters:  this.state.draftRun.distance_in_meters,
                time_in_seconds: newValue,
              }})
            }}
          />
          <RaisedButton label="Add" primary={true} style={buttonStyle} onClick={this.addNewRun}/>
          <RaisedButton label="Cancel" primary={true} style={buttonStyle} onClick={this.hideInputs}/>
        </div>
      );
    }
  }

  render() {
    const runs = this.state.runs;
    if (this.state.loggedIn === false) {
      return (<Redirect to='/' />);
    }
    if (this.state.loading) {
      return (<PulseLoader size={30} margin={'30px'} />);
    }
    return (
      <div>
        <AppBar title="Runs" showMenuIconButton={false} />
        {this.state.errorMessage !== null && <div style={errorStyle}>{this.state.errorMessage}</div>}
        { this.renderInputBlock() }
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Date</TableHeaderColumn>
              <TableHeaderColumn>Distance</TableHeaderColumn>
              <TableHeaderColumn>Time</TableHeaderColumn>
              <TableHeaderColumn>Calories Burned</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
          {runs.map((run, index) => (
            <TableRow key={index}>
              <TableRowColumn>{run.created_at}</TableRowColumn>
              <TableRowColumn>{run.distance_in_meters}</TableRowColumn>
              <TableRowColumn>{run.time_in_seconds}</TableRowColumn>
              <TableRowColumn>{run.calories_burned}</TableRowColumn>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default RunsView;
