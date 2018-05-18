import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { PulseLoader } from 'react-spinners'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';
import { Redirect } from "react-router-dom";
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
      runErrors: {
        distance_in_meters: null,
        time_in_seconds: null,
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
        loading: false,
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
    if (result.status === 201) {
      this.setState({
        runs: result.runs,
        loading: false,
        draftRun: {
          distance_in_meters: 0.0,
          time_in_seconds: 0.0,
        },
        runErrors: {
          distance_in_meters: null,
          time_in_seconds: null,
        },
        errorMessage: null
      });
      return;
    }
    if (result.status === 401) {
      this.setState({
        loggedIn: false,
        loading: false,
      });
      return;
    }
    if (result.status === 422) {
      this.setState({
        runErrors: result.message,
        errorMessage: 'Invalid Input',
        loading: false,
      });
      return;
    }
    this.setState({
      runErrors: this.state.runErrors,
      errorMessage: result.message,
      loading: false,
    });
  }

  renderInputBlock = () => {
    const inputStyle = {
      marginLeft: "10px",
      width: "150px",
    };
    if (this.state.showInputs === false) {
      return (<RaisedButton className="addrun" label="Add Run" primary={true} style={buttonStyle} onClick={this.showInputs}/>);
    } else {
      return (
        <div>
          <TextField
            className="distancefield"
            hintText="Distance"
            floatingLabelText="Distance in meters"
            floatingLabelFixed={true}
            type="number"
            style={inputStyle}
            errorText={this.state.runErrors.distance_in_meters}
            onChange={(event,newValue) => {
              this.setState({draftRun:{
                distance_in_meters: newValue,
                time_in_seconds: this.state.draftRun.time_in_seconds,
              }})
            }}
          />
          <TextField
            className="timefield"
            hintText="Time"
            floatingLabelText="Time in seconds"
            floatingLabelFixed={true}
            type="number"
            style={inputStyle}
            errorText={this.state.runErrors.time_in_seconds}
            onChange={(event,newValue) => {
              this.setState({draftRun:{
                distance_in_meters:  this.state.draftRun.distance_in_meters,
                time_in_seconds: newValue,
              }})
            }}
          />
          <RaisedButton className="addrun" label="Add" primary={true} style={buttonStyle} onClick={this.addNewRun}/>
          <RaisedButton className="cancelrun" label="Cancel" primary={true} style={buttonStyle} onClick={this.hideInputs}/>
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
              <TableHeaderColumn>Distance in meters</TableHeaderColumn>
              <TableHeaderColumn>Time in seconds</TableHeaderColumn>
              <TableHeaderColumn>Calories Burned (Kcal/Minute)</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
          {runs.map((run, index) => (
            <TableRow className="runrow" key={index}>
              <TableRowColumn>{run.created_at}</TableRowColumn>
              <TableRowColumn>{run.distance_in_meters}</TableRowColumn>
              <TableRowColumn>{run.time_in_seconds}</TableRowColumn>
              <TableRowColumn>{run.kcal_minute}</TableRowColumn>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default RunsView;
