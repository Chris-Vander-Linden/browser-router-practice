import React from 'react';
import axios from 'axios';
import './BestBooks.css';
import missingImg from '../images/missing-img.png';

class BestBooks extends React.Component {

  constructor (props) {
    super(props);
    this.state =
    {
      bookData: [],
      searchBookData: [],
      bookToPost: {},
      searchBook: '',
      selectedBookGoogleID: '',
      activeTextSearch: true,
      disableSearch: true
    }
  }

  handleBookSearchText = (event) => {
    this.setState(
      {
        activeTextSearch: true,
        searchBook: event.target.value,
        disableSearch: event.target.value === ''
      })
  }

  handleBookSearchSelect = (event) => {
    this.setState({
      selectedBookGoogleID: event.target.value,
      disableSearch: event.target.value === ''
    })
  }

  getAllBooks = () => {
    axios.get(`${process.env.REACT_APP_RENDERURL}/books`).then(data => this.setState({ bookData: data.data }));
  }

  handleBookDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_RENDERURL}/books/${id}`)
      .then(this.getAllBooks)
      .catch(error => console.error(error));
  }

  handleBookUpdate = (id) => {
    axios.put(`${process.env.REACT_APP_RENDERURL}/books/${id}`,
      {
        title: 'Another change',
        author: ['New Author', 'New Author 2'],
        description: 'description change!!!!!',
        status: true
      })
      .then(this.getAllBooks)
      .catch(error => console.error(error));
  }

  handleBookSearchSubmit = (event) => {
    event.preventDefault();

    if (this.state.selectedBookGoogleID && !this.state.activeTextSearch) {

      const bookToPost = this.state.searchBookData.filter(book => book.googleBookID === this.state.selectedBookGoogleID)[0];

      axios.post(`${process.env.REACT_APP_RENDERURL}/books/`, bookToPost).then(this.getAllBooks);

      return;
    };

    // Google API
    axios.get(`${process.env.REACT_APP_RENDERURL}/searchBooks/?search=${this.state.searchBook}`).then(data => {
      console.log(data.data);
      this.setState({
        searchBookData: data.data,
        disableSearch: true,
        activeTextSearch: false,
        selectedBookGoogleID: ''
      });
    }
    );
  }

  componentDidMount() {
    this.getAllBooks();
  }

  //static contextType = Context;
  render() {

    const searchResults = this.state.searchBookData?.length !== 0 ? [<option value="" disabled selected>Select a book from the dropdown...</option>, ...this.state.searchBookData.map(book => (
      <option key={ book.googleBookID } value={ book.googleBookID }>{ book.title } ({ book.author })</option>
    ))] : <option value="" disabled>Search above...</option>;

    const books = this.state.bookData.reverse().map(book => (
      <li key={ book._id } className='libraryBooks'>
        <div>
          <img src={ book.image ? book.image : missingImg } alt={ book.title } />
          <button onClick={ () => { this.handleBookUpdate(book._id) } }>Update</button>
          <button onClick={ () => { this.handleBookDelete(book._id) } }>Delete</button>
        </div>
        <div>
          <div className={ `statusBanner ${book.status ? 'read' : ''}` }>{ book.status ? 'Read' : 'Unread' } </div>
          <h3>{ book.title }</h3>
          <h4>{ book.author?.join(', ') }</h4>
          { book.description }
        </div>
      </li>
    ));

    return (
      <div id='bestBookContainer' className='contentContainer'>
        <h2>Books</h2>
        <h3>Search/Submit:</h3>
        <form onSubmit={ this.handleBookSearchSubmit }>

          <label htmlFor="searchBook">Search for a book to add:</label>
          <input id="searchBook" name="searchBook" type="text" onChange={ this.handleBookSearchText } value={ this.state.searchBook } placeholder="Type a book..." />

          <label className={ this.state.activeTextSearch ? 'hide' : '' } htmlFor="selectBook">Choose a book below:</label>
          <select id="selectBook" className={ this.state.activeTextSearch ? 'hide' : '' } name="selectBook" placeholder="Search for a book" onChange={ this.handleBookSearchSelect } value={ this.state.selectedBookGoogleID }>
            { searchResults }
          </select>

          <input type="submit" value={ this.state.activeTextSearch ? 'Search' : 'Submit' } disabled={ this.state.disableSearch } />
        </form>

        <h3>Total Results:</h3>
        <ul>
          { books?.length ? books : 'You have no books!' }
        </ul>
      </div>
    )
  }
}

export default BestBooks;