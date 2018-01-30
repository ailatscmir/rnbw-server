import React, {Component} from 'react';
import './App.css';
import ClickableSvg from './ClickableSvg';
// import Hammer from "react-hammerjs";


// import renderHTML from 'react-render-html';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      hammerAction: 'no action',
      storeselected: ''
    };
  }

  componentDidMount() {
    // console.log(svgmap);
    fetch('/stores').then(res => res.json()).then((stores) => {
      // this.setState({stores})
    });

  }

  render() {

    return (<div id="App">
      <ClickableSvg />
      {/* <Hammer onTap={this.handleTap}
              onSwipe={this.handleSwipe}
              onPan={this.handlePan}>
        <div>{renderHTML(svgmap)}</div>
      </Hammer> */}
    </div>);
  }
}

export default App;
