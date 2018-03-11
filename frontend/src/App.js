import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Reboot from 'material-ui/Reboot';
import Grid from 'material-ui/Grid';
import {CircularProgress} from 'material-ui/Progress';
import { LinearProgress } from 'material-ui/Progress';
import {setFetchFlag, saveItems} from './actions/fetch';

import AreasList from './AreasList';
import InteractiveSvg from './InteractiveSvg';
import * as constants from './constants';

const mapStateToProps = (state) => {
  return {
    map: state.map,
    locations: state.locations,
    currentFloor: state.currentFloor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFetchFlag: bindActionCreators(setFetchFlag, dispatch),
    saveItems: bindActionCreators(saveItems, dispatch)
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
    })
  }

  componentDidMount() {
    this.fetchApi(constants.API_LOCATIONS, 'LOCATIONS');
    this.fetchApi(constants.API_MAP, 'MAP');
  }



  render() {

    return (<div className="app">
      <Reboot/>
        <Grid className='fullScreenFlex' container spacing={0}>
          <Grid item xs={6} md={2} className="scrollable">
            {(this.props.locations.length>0)?<AreasList />:<LinearProgress color="secondary" />}
          </Grid>

          <Grid item xs={6} md={10}>
            {(this.props.map.length>0)?<InteractiveSvg data={this.props.map} />:<CircularProgress />}
          </Grid>

        </Grid>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
