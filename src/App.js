import React from 'react';
import { Outlet } from "react-router-dom";
import Nav from './components/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = { bookData: [] }
  }

  render() {
    return (
      <>
        <Nav />
        <Outlet />
      </>
    );
  }
}

export default App;
