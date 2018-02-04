import React, {Component} from 'react';
import ClickableSvg from './ClickableSvg';
import { connect } from "react-redux";
import selectStore from './actions/index.js'

const mapDispatchToProps = dispatch => {
  return {
    selectStore: storePath => dispatch(selectStore(storePath))
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: []
    };
  }

  componentDidMount() {
    fetch('/stores').then(res => res.json()).then((stores) => {
      // this.setState({stores})
    });
  }

  render() {
    return (<div id="App">
    </div>);
  }
}
const ConnectedApp = connect(null,mapDispatchToProps)(App)
export default App;
