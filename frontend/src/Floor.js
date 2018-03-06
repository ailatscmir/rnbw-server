import React, {Component} from 'react';
import Layer from './Layer';
class Floor extends Component {

  render() {
    var data = this.props.data.g;
    var id = this.props.data['@attributes']['id'];
    return (<g id={id} key={id}>
      {data.map((layer,index) => {
        return <Layer key={layer['@attributes']['id']} data={layer}/>;
      })}
    </g>)
  }
}

export default Floor;
