import React, {Component} from 'react'
import {connect} from "react-redux";

import List, { ListItem, ListItemText } from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';
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
    const { classes } = this.props;
    return (<List>
      {(this.props.fetchLocations==='complete')&&(this.props.locations.length>0)
        ? this.props.locations.map((location) => {
        return <ListItem button key={location['ID']}>
          <ListItemText primary={location['post_title']} />
        </ListItem>;
        })
        : <CircularProgress className={classes.progress} />}
    </List>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles()(AreasList));
