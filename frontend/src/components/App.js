import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-select/dist/react-select.css';

import { Route } from 'react-router-dom'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import CategoryView from './CategoryView'
import PostDetail from './PostDetail'


class App extends Component {
  render() {
    return (
      <div className="App">
          <Route exact path="/" component={CategoryView}/>
          <Route exact path='/:category' component={CategoryView}/>
          <Route exact path='/:category/:id' component={PostDetail}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        categories: state.categories,
    }
}

export default connect(mapStateToProps)(App)
