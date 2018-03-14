import React, {Component,Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Reboot from 'material-ui/Reboot';
import Grid from 'material-ui/Grid';
import {CircularProgress} from 'material-ui/Progress';
import { LinearProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemText,ListItemIcon } from 'material-ui/List';
import {setFetchFlag, saveItems} from './actions/fetch';

import LocationsList from './LocationsList';
import InteractiveSvg from './InteractiveSvg';
import * as constants from './constants';
import FuzzySearch from 'fuzzy-search';

const selectLocation = (location) => {
  return {
    type: 'SELECT_LOCATION',
    payload: location
  }
}

const mapStateToProps = (state) => {
  return {
    map: state.map,
    locations: state.locations,
    currentFloor: state.currentFloor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectLocation: bindActionCreators(selectLocation, dispatch),
    setFetchFlag: bindActionCreators(setFetchFlag, dispatch),
    saveItems: bindActionCreators(saveItems, dispatch)
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: []
    }
    this.handleSearchField = this.handleSearchField.bind(this);
  }

  selectLocation(location){
    this.props.selectLocation(location);
  }

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

  handleSearchField(ev){
    console.log(ev.target.value);
    if (ev.target.value!==''){
      const searcher = new FuzzySearch(this.props.locations, ['title'], {
        caseSensitive: false,
      });
      const result = searcher.search(ev.target.value);
      this.setState({searchResult:result});
    } else this.setState({searchResult:[]})
  }

  render() {

    return (<div className="app">
      <Reboot/>
        <Grid className='fullScreenFlex' container spacing={0}>
          <Grid item xs={6} md={2} className="scrollable">
            <TextField
              id="search"
              label="Поиск"
          // className={classes.textField}
              // value={this.state.search}
              onChange={this.handleSearchField}
              margin="normal"
            />
            {(this.state.searchResult.length!==0)
            ?<Fragment><p>Результаты поиска:</p>
            <List component="div" disablePadding>
                 {this.state.searchResult.map((location) => {

                   return <ListItem button key={location.name} onClick={() => {this.selectLocation(location.name)}}>
                     <ListItemText inset primary={location.title} />
                   </ListItem>
                 })}
            </List>
          </Fragment>
            :null}


            {(this.props.locations.length>0)?<LocationsList />:<LinearProgress color="secondary" />}
          </Grid>

          <Grid item xs={6} md={10}>

            {(this.props.map.length>0)?<InteractiveSvg data={this.props.map} />:<CircularProgress />}
          </Grid>

        </Grid>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
