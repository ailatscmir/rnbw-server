import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import testFunc from './actions/testAction';
import InteractiveSvg from './InteractiveSvg';
import Hammer from 'react-hammerjs';
const mapStateToProps = (state) => {
  return {selectedStore: state.stores}
}

const mapDispatchToProps = (dispatch) => {
  return {
    testAction: bindActionCreators(testFunc, dispatch)
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hammer: 'EMPTY',
      e: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleTap = this.handleTap.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.handlePinch = this.handlePinch.bind(this);
    this.handlePan = this.handlePan.bind(this);
  }
  componentDidMount() {
    fetch('/stores').then(res => res.json()).then((stores) => {
      this.setState({stores})
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.props.testAction('');
  }

  handleTap(e) {
    this.setState({hammer: 'TAP'})
  }

  handlePan(e) {
    this.setState({hammer: 'PAN',e:e});
  }
  handleSwipe(e) {
    this.setState({hammer: 'SWIPE'})
  }
  handlePinch(e) {
    this.setState({hammer: 'PINCH',e:e})
  }
  render() {
    return (<div>
      <Hammer
        onTap={this.handleTap}
        onPan={this.handlePan}
        onSwipe={this.handleSwipe}
        onPinch={this.handlePinch}
        options={{
          direction: 'DIRECTION_ALL',
          recognizers: {
            pinch: {
              enable: true
            }
          }}}>
        <div>
          <InteractiveSvg/>
        </div>
      </Hammer>
      <button onClick={this.handleClick}>RESET</button>
      <h3>{this.state.hammer}</h3>
      <p>{(this.state.e.additionalEvent)?this.state.e.additionalEvent:'none'}</p>
      <p>VELOCITY:{this.state.e.overallVelocity}</p>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
