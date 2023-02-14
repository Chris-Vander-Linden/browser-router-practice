import React from 'react';
import { Outlet } from "react-router-dom";
import Nav from './components/Nav';
import './App.css';


class App extends React.Component {

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
