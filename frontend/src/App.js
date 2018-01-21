import React, {Component} from 'react';
import './App.css';
class App extends Component {
    state = {
        stores: []
    }

    componentDidMount() {
        fetch('/stores').then(res => res.json()).then((stores) => {
          this.setState({stores})
        });
    }

    render() {


        return (<div className="App">
            <h1>Stores</h1>
            {this.state.stores.map(store =>
              <div key={store.id}>{store.post_title}</div>
            )}
        </div>);
    }
}

export default App;
