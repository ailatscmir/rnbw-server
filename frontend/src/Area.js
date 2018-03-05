import React, {Component} from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
// import getBounds from 'svg-path-bounds'

const selectArea = (id,d) =>{
  return {type: 'SELECT_AREA', payload: id};
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectArea: bindActionCreators(selectArea, dispatch),
  }
}

const mapStateToProps = (state) => {
  return {selectedArea: state.selectedArea}
}

class Area extends Component {
  constructor(props) {
    super(props);
    this.handleAreaClick = this.handleAreaClick.bind(this);
  }

  componentDidMount() {}

  handleAreaClick(e) {
    e.preventDefault();
    var targetArea = e.target;
    this.props.selectArea(e.target.id,targetArea.getAttribute('d'));
  }

  render() {
    var area = this.props.attr;
    var selectedArea = this.props.selectedArea;
    return (<path id={area.id} d={area.d} fill={(area.id!==selectedArea)?area.fill:'#000000'} opacity={((selectedArea!=='')&&(area.id!==selectedArea))?'0.5':'1'} onClick={this.handleAreaClick}/>)
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(Area);
