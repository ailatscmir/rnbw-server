import React, {Component} from 'react'
import {connect} from "react-redux";

import List, { ListItem, ListItemText } from 'material-ui/List';
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
    console.log(this.props.locations);
    return (<List>
      {this.props.locations.map((location) => {
        return <ListItem button key={location['ID']}>
          <ListItemText primary={location['post_title']} />
        </ListItem>;
      })}
    </List>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles()(AreasList));
