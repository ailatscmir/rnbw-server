import React, {Component} from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';



import Floor from './Floor';
// import jsonQuery from 'json-query';

// import Category from './Category';
function floorCompare(a,b) {
  if (a['title'] < b['title'])
    return -1;
  if (a['title'] > b['title'])
    return 1;
  return 0;
}



function svgAction(data) {
  return {type: 'EXEC_TEST', payload: data}
}

const mapDispatchToProps = (dispatch) => {
  return {
    svgClick: bindActionCreators(svgAction, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {map: state.map}
}

class InteractiveSvg extends Component {
  componentDidMount() {}



  handleSvgClick(e) {}

  render() {
    let floors = this.props.data;
    floors.sort(floorCompare);
    return (<svg viewBox={floors[0]['@attributes']['viewBox']}>
    {floors.map((floor,index) => {
          return <Floor key={floor['title']} index={index} data={floor['g']} />;
    })}
  </svg>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveSvg);
