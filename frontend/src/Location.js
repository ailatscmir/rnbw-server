import React, {Component} from 'react'
import {connect} from "react-redux";
class Location extends Component {

  constructor(props) {
   super(props);
   this.handleSelectLocation = this.handleSelectLocation.bind(this);
 }
  componentDidMount() {}

  handleSelectLocation(e){
    e.preventDefault();
  }

  render() {
    let location = this.props.data;
    return (
      <path key={location['@attributes']['id']} id={location['@attributes']['id']} d={location['@attributes']['d']} fill={location['@attributes']['fill']} onClick={this.handleSelectLocation} />
    )
  }
}

export default connect(null, null)(Location);
