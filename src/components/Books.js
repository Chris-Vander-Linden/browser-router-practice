import React from 'react';
import axios from 'axios';

class Books extends React.Component {

  constructor (props) {
    super(props);
    this.state = { bookData: [] }
  }

  componentDidMount() {
    axios.get('https://can-of-books-backend-3urh.onrender.com/books').then(data => this.setState({ bookData: data.data }));
  }

  render() {
    const books = this.state.bookData.map(book => (
      <li key={ book._id }>{ book.title }: { book.description }, { book.status }</li>
    ));

    return (
      <ul>
        { books }
      </ul>
    )
  }
}

export default Books;