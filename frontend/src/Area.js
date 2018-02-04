import React, {Component} from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

const areaClick = (data) =>{
  return {type: 'EXEC_TEST', payload: data};
}
const mapDispatchToProps = (dispatch) => {
  return {
    areaClick: bindActionCreators(areaClick, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {selectedStore: state.selectedStore}
}

class Area extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ''
    }
    this.handleAreaClick = this.handleAreaClick.bind(this);
  }

  componentDidMount() {

  }
  handleAreaClick(e) {
    e.preventDefault();
    this.props.areaClick(e.target.id);

  }
  render() {

    var area = this.props.attr;
    var selectedStore = this.props.selectedStore;
    return (<path id={area.id} d={area.d} fill={(area.id!==selectedStore)?area.fill:'#000000'} opacity={((selectedStore!=='')&&(area.id!==selectedStore))?'0.5':'1'} onClick={this.handleAreaClick}/>)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Area);
