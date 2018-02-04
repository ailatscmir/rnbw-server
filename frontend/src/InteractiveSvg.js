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
  return {selectedStore: state.selectedStore}
}

class InteractiveSvg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xml: null
    }
    this.handleSvgClick = this.handleSvgClick.bind(this);
  }
  componentDidMount(){
    // console.log(rawMap );
    var xml=[];
    var XMLParser = new Parser({explicitArray: false,explicitRoot: false,mergeAttrs:true});
    XMLParser.parseString(rawMap, function (err, result) {
      xml = result;
    });
    this.setState({xml:xml});
    // console.log(SOQ.get(xml,{'item.name':'svg'}));

  }
  handleSvgClick(e) {
    e.preventDefault();
    this.props.svgClick('circle');
  }

  render() {
    // console.log(jsonQuery('[*][**]g[*id~landmarks]',{data: this.state.xml,allowRegexp:true}).value);
    var viewBox = jsonQuery('viewBox',{data: this.state.xml,allowRegexp:true}).value;
    var categories = jsonQuery('[*][**]g[*id~landmarks]',{data: this.state.xml,allowRegexp:true}).value;
    // console.log('[*][**]path[id'+this.props.selectedStore);
    console.log(jsonQuery('[*][**]g.path[id='+this.props.selectedStore+']',{data: this.state.xml,allowRegexp:true}).value);
    return (
      (this.state.xml==null)
        ?<p>loading</p>
        :<svg viewBox={viewBox}>
          <line x1="20" y1="100" x2="100" y2="20" stroke="black"/>
          {categories.map((category) => {
            return <Category key={category.id} value={category}/>
          })}
        </svg>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveSvg);
