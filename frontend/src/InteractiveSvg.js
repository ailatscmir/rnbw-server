import React, {Component} from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {Parser} from 'xml2js';
import jsonQuery from 'json-query';

import rawMap from './floor1_2018129819337.svg';


import Category from './Category';

function svgAction(data) {
  return {type: 'EXEC_TEST', payload: data}
}

const mapDispatchToProps = (dispatch) => {
  return {
    svgClick: bindActionCreators(svgAction, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {selectedStore: state.selectedStore, boundingBox: state.boundingBox}
}

class InteractiveSvg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xml: null
    }
    this.handleSvgClick = this.handleSvgClick.bind(this);
  }
  componentDidMount() {
    // console.log(rawMap );
    var xml = [];
    var XMLParser = new Parser({explicitArray: false, explicitRoot: false, mergeAttrs: true});
    XMLParser.parseString(rawMap, function(err, result) {
      xml = result;
    });
    this.setState({xml: xml});
    // console.log(SOQ.get(xml,{'item.name':'svg'}));

  }
  handleSvgClick(e) {
    e.preventDefault();
    this.props.svgClick('circle');
  }

  render() {
    // console.log(jsonQuery('[*][**]g[*id~landmarks]',{data: this.state.xml,allowRegexp:true}).value);
    var viewBox = jsonQuery('viewBox', {
      data: this.state.xml,
      allowRegexp: true
    }).value;
    var categories = jsonQuery('[*][**]g[*id~landmarks]', {
      data: this.state.xml,
      allowRegexp: true
    }).value;
    // (this.props.boundingBox.lenght) ? console.log('123');
    // console.log('[*][**]path[id'+this.props.selectedStore);
    let boundingBox = (this.props.boundingBox) ? this.props.boundingBox : null;
    let boundingBoxDOM = (boundingBox) ? <rect x={boundingBox[0]} y={boundingBox[1]} height={boundingBox[3]-boundingBox[1]} width={boundingBox[2]-boundingBox[0]} stroke="black" /> :  <rect x1='40' y1='40' x2='100' y2='100' />;
    let mapDOM = (this.state.xml == null)
      ? <p>loading</p>
      : <svg viewBox={viewBox}>
        <g>{boundingBoxDOM}</g>
        {
          categories.map((category) => {
            return <Category key={category.id} value={category}/>
          })
        }
      </svg>;
    return (<div>

      {mapDOM}
    </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveSvg);
