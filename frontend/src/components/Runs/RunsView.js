import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { PulseLoader } from 'react-spinners'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Runs from '../../network/Runs';

class RunsView extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
      loading: true,
      errorMessage: null,
      runs: [],
    };
  }
  async componentDidMount() {
    const data = await Runs.get();
    if (data.status !== 200) {
      const loggedIn = data.status === 401 ? false : true;
      this.setState({
        loggedIn,
        errorMessage: data.message,
      });
    } else {
      this.setState({ runs: data.runs, loading: false });
    }
  }

  render() {
    const runs = this.state.runs;
    if (this.state.loggedIn === false) {
      return (<Redirect to='/' />);
    }
    return (
      <div>
        <AppBar title="Runs" showMenuIconButton={false} />
        {this.state.loading === true && <PulseLoader size={30} margin={'30px'} />}
      </div>
    );
  }
}

export default RunsView;
