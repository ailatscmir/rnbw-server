import React, {Component} from 'react';
import './App.css';
// import Hammer from "react-hammerjs";
// import svgmap from './floor1_20171114203824923.svg';
// import renderHTML from 'react-render-html';
import MyD3Comp from './MyD3Comp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      hammerAction: 'no action',
      storeselected: ''
    };

    this.handleTap = this.handleTap.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.handlePan = this.handlePan.bind(this);
  }

  componentDidMount() {
    // console.log(svgmap);
    fetch('/stores').then(res => res.json()).then((stores) => {
      this.setState({stores})
    });
  }

  handleTap(ev) {
    this.setState({hammerAction: 'clicked '+ev.target.id})
    console.log(ev.target.id);
  }

  handleSwipe() {
    this.setState({hammerAction: 'swipe'});
    console.log('swipe');
  }
  handlePan(ev){
    (ev.additionalEvent)? this.setState({hammerAction: ev.additionalEvent}) : this.setState({hammerAction: 'no direction'});
    console.log(ev);
  }

  render() {
    return (<div className="App">
      <h1>Stores</h1>
      <MyD3Comp />
      {/* <Hammer onTap={this.handleTap}
              onSwipe={this.handleSwipe}
              onPan={this.handlePan}>
        <div>{renderHTML(svgmap)}</div>
      </Hammer> */}

      <p>{this.state.hammerAction}</p>
      {
        // this.state.stores.map(store => <div key={store.ID}>{store.post_title}</div>)
      }

    </div>);
  }
}

export default App;
