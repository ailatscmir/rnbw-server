import React from 'react'
import * as d3 from 'd3'
import {withFauxDOM} from 'react-faux-dom'
import ReactFauxDOM from 'react-faux-dom';
import svgmap from './floor1_20171114203824923.svg';
import renderHTML from 'react-render-html';
class MyD3Comp extends React.Component {
  // const svgRaw = d3.xml(svgmap);
  constructor(props) {
    super(props);
    this.state = {
      element: new ReactFauxDOM.Element('div')
    };
  }

  componentDidMount () {
    const faux = this.props.connectFauxDOM('div', 'svgMap');
    var stElement = d3.select(faux).append("svg")
    .remove()
    .attr("width", 400)
    .attr("height", 400);
    // stElement.setAttribute('color':48);
    this.setState({element:stElement});
    console.log(stElement);
    // d3.select(faux).append(stElement);

    this.props.drawFauxDOM(3800);
  }

  render () {
    var output = this.props.svgMap;
    console.log(output);
    return (
      // '123'
      <div>
      {output}
    </div>
    );
  }
}

MyD3Comp.defaultProps = {
  chart: 'loading'
}

export default withFauxDOM(MyD3Comp)
