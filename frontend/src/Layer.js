import React, {Component} from 'react'
import Location from './Location';
import Pathfinder from './Pathfinder';
class Layer extends Component {

  componentDidMount() {}

  render() {
    let data = this.props.data;
    let type = data['@attributes']['id'];
    return (<g className={type}>
      {
        (type.includes('landmarks'))
          ? (data.path.length)
            ? data.path.map((location) => {return <Location key={location['@attributes']['id']} data={location}/>})
            : <Location key={data.path['@attributes']['id']} data={data.path}/>
          : null
      }
      {
        (type==='routes')?<Pathfinder data={data} />:null
      }
    </g>);
  }
}

export default Layer;
