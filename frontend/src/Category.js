import React, {Component} from 'react'
import Area from './Area';
class Category extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // console.log(this.props);
  }
  render() {
    var category = this.props.value;
    return (<g id={category.id}>
      {
        category.path.map((path) => {
          return <Area key={path.id} attr={path} />
          // return <path key={path.id} id={path.id} d={path.d} fill={path.fill}/>
        })
      }
    </g>)
  }
}

export default Category;
