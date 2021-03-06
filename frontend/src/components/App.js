import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Route } from 'react-router-dom'
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

export default App;