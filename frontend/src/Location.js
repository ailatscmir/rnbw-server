import React, {Component} from 'react'
import {connect} from "react-redux";
class Location extends Component {

  componentDidMount() {}

  render() {
    let location = this.props.data;
    console.log(location);
    return (
      <path d={location['@attributes']['d']} fill={location['@attributes']['fill']}/>
    )
  }
}

export default connect(null, null)(Location);
