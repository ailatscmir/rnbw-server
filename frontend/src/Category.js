import React, {Component} from 'react';
// const categoryColors = {
//   clothes: '#F2C94C',
//   entertaiment: '#BB6BD9',
//   maintance: '#56CCF2',
//   foodandhome: '#EB5757',
//   electronics: '#2D9CDB'
// };
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paths: props.children.path
    };
    this.storePathSelect = this.storePathSelect.bind(this);
  }

  storePathSelect(ev) {
    console.log(ev.target);
    return true;
  }

  render() {
    var paths = this.state.paths;
    return (Object.values(paths).map((path) => {
      // return <text key={index} y={(index+3)*30}>{value.id}</text>;
      return <path id={path.id} key={path.id} d={path.d} onClick={this.storePathSelect}></path>;
    }))
  }
}
export default Category;
