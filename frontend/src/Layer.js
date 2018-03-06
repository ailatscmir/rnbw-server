import React, {Component} from 'react'
import Location from './Location';
class Layer extends Component {
  componentDidMount() {}
  render() {
    let data = this.props.data;
    let type = data['@attributes']['id'];
    return (<g className={type}>
      {
        (type.includes('landmarks'))
          ? (data.path.length)
            ? data.path.map((location) => {console.log(location);return <Location key={location['@attributes']['id']} data={location}/>})
            : <Location key={data.path['@attributes']['id']} data={data.path}/>
          : 0
      }
    </g>);
  }
}

export default Layer;
