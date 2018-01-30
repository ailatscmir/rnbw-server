import React, {Component} from 'react';
import svgmap from './floor1_20171114203824923.svg';
import XML2JS from 'xml2js';
import SOQ from 'simple-object-query';
import Category from './Category';
class ClickableSvg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xml: []
    };

  }
  componentDidMount() {
    // var XMLParser = new xml2js();
    var parser = new XML2JS.Parser({mergeAttrs:true});
    parser.parseString(svgmap,(err,result) =>{
      if (Object.keys(result).length !== 0) {
        this.setState({xml:SOQ.get(result,'svg.g.0.g')})
      }
    });
  }

  render() {
    var svgg = this.state.xml;
    // console.log( svgg);
    return (<svg viewBox="0 0 3236 1220">
      {Object.values(svgg).map((cat) =>{
        // return <text key={index} y={(index+3)*30}>{value.id}</text>;
        return <Category key={cat.id}>
          {cat}
        </Category>;
      })}
    </svg>);
  }
}

export default ClickableSvg;
