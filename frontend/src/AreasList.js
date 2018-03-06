import React, {Component} from 'react'
import {connect} from "react-redux";

import List, { ListItem, ListItemText } from 'material-ui/List';
import { LinearProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  return {
    fetchLocations: state.fetchLocations,
    locations: state.locations
  }
}

class AreasList extends Component {

  componentDidMount() {}

  render() {
    return (<List>
      {(this.props.fetchLocations==='complete')&&(this.props.locations.length>0)
        ? this.props.locations.map((location) => {
        return <ListItem button key={location['ID']}>
          <ListItemText primary={location['post_title']} />
        </ListItem>;
        })
        : <LinearProgress color="secondary" />}
    </List>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles()(AreasList));
