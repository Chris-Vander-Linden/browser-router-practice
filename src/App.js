import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home.js';
import About from './components/About.js';
import BestBooks from './components/BestBooks.js';
import Nav from './components/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = { bookData: [] }
  }

  getAllBooks = () => {
    axios.get(`${process.env.REACT_APP_RENDERURL}/books`).then(data => this.setState({ bookData: data.data.reverse() }));
  }

  componentDidMount(){
    this.getAllBooks();
  }

  render() {
    return (
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={ <Home bookData={this.state.bookData}/> } />
          <Route path="/books" element={ <BestBooks bookData={this.state.bookData} getAllBooks={this.getAllBooks}/> } />
          <Route path="/about" element={ <About /> } />
          <Route path="*" element={ <Home /> } />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
