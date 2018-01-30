import React, {Component} from 'react';

class StorePath extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.path.id.toString(),
      d: this.props.path.d,
      fill: this.props.path.fill
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(ev){
    console.log(ev.target);
  }

  render(){
    return (
      <path id={this.state.id} d={this.state.d}>{this.state.fill} onClick={this.handleClick}></path>
    )
  }
}
export default StorePath;
