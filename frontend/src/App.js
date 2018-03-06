import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

import Reboot from 'material-ui/Reboot';
import Grid from 'material-ui/Grid';
import {CircularProgress} from 'material-ui/Progress';

import {setFetchFlag, saveItems} from './actions/fetch';



import AreasList from './AreasList';
import InteractiveSvg from './InteractiveSvg';

import * as constants from './constants';

const mapStateToProps = (state) => {
  return {
    map: state.map
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFetchFlag: bindActionCreators(setFetchFlag, dispatch),
    saveItems: bindActionCreators(saveItems, dispatch),
  }
}

class App extends Component {

  fetchApi(apiUrl, fetchFlag) {
    this.props.setFetchFlag(fetchFlag, 'fetching');
    fetch(apiUrl).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      // this.setState({isLoading: false});
      return response;
    }).then((response) => response.json()).then((items) => {
      this.props.setFetchFlag(fetchFlag, 'complete');
      this.props.saveItems(fetchFlag, items);
    });
  }

  componentDidMount() {
    this.fetchApi(constants.API_LOCATIONS, 'LOCATIONS');
    this.fetchApi(constants.API_MAP, 'MAP');
  }

  render() {
    return (<div className="app">
      <Reboot/>
      <div className="main-container">
        <Grid container className="child" spacing={0}>
          <Grid item xs={6} md={2} className="scrollable">
            <AreasList/>
          </Grid>
          <Grid item xs={6} md={10}>
            {(this.props.map.length>0) ? <div style={{padding:40+'px'}} ><InteractiveSvg data={this.props.map} /></div>:<CircularProgress />}
          </Grid>
        </Grid>
      </div>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
