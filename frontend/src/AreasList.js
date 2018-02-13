import React, {Component} from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

// const url = '/stores';

const mapDispatchToProps = (dispatch) => {
  return {}
}

// const mapStateToProps = (state) => {}

class AreasList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  fetchData(url) {
    // this.setState({isLoading: true});
    fetch(url).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      // this.setState({isLoading: false});
      return response;
    }).then((response) => response.json()).then((items) => console.log(items));
  }

  render() {
    this.fetchData('/stores');
    return (<ul>
      <li>Список магазинов</li>
    </ul>)
  }
}

export default connect(null, mapDispatchToProps)(AreasList);
