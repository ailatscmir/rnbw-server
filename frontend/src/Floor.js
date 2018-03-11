import React, {Component} from 'react';
import Layer from './Layer';

import {connect} from "react-redux";
// import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => {
  return {currentFloor: state.currentFloor}
}

class Floor extends Component {

  render() {
    var data = this.props.data.g;
    var id = this.props.data['@attributes']['id'];
    return (<g id={id} key={id} className={(id.slice(-1)!==this.props.currentFloor)?'hideFloor':'showFloor'}>
      {data.map((layer,index) => {
        return <Layer key={layer['@attributes']['id']} data={layer}/>;
      })}
    </g>)
  }
}

export default connect(mapStateToProps, null)(Floor);
