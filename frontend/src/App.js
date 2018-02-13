import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import InteractiveSvg from './InteractiveSvg';
import AreasList from './AreasList';
import Hammer from 'react-hammerjs';

function selectArea(data) {
  return {type: 'EXEC_TEST', payload: data}
}

const mapStateToProps = (state) => {
  return {selectedStore: state.stores, storesArray: state.storesArray}
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectArea: bindActionCreators(selectArea, dispatch)
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleHammerTap = this.handleHammerTap.bind(this);
    this.handleHammerSwipe = this.handleHammerSwipe.bind(this);
    this.handleHammerPinch = this.handleHammerPinch.bind(this);
    this.handleHammerPan = this.handleHammerPan.bind(this);
  }
  componentDidMount()   {}

  handleHammerTap(e)    {}
  handleHammerPan(e)    {}
  handleHammerSwipe(e)  {}
  handleHammerPinch(e)  {}

  render() {
    return (<div>
      <Hammer onTap={this.handleHammerTap} onPan={this.handleHammerPan} onSwipe={this.handleHammerSwipe} onPinch={this.handleHammerPinch} options={{
          direction: 'DIRECTION_ALL',
          recognizers: {
            pinch: {
              enable: true
            }
          }
        }}>
        <div>
          <InteractiveSvg />
        </div>
      </Hammer>
      <AreasList />
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
