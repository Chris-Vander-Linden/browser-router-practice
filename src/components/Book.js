import React from 'react';
import missingImg from '../images/missing-img.png';

class Book extends React.Component {
  constructor (props) {
    super(props);
    /*
    this.state = {
      showUpdateForm: false,
      status: this.props.book.status,
      title: this.props.book.title,
      author: this.props.book.author,
      description: this.props.book.description
    }
    */
    this.state = {
      showUpdateForm: false,
      status: this.props.book.status,
      title: this.props.book.title,
      author: this.props.book.author,
      description: this.props.book.description
    }
  }

  handleBookFormChange = (event) => {
    const inputValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    this.setState({ [event.target.name]: inputValue })
  }

  render() {
    return <>
      <div>
        <img src={ this.props.book.image ? this.props.book.image : missingImg } alt={ this.props.book.title } />
        <button onClick={ () => { this.setState({ showUpdateForm: !this.state.showUpdateForm }) } } disabled={ this.state.showUpdateForm } >Update</button>
        <button onClick={ () => { this.props.onBookDelete(this.props.book._id) } }>Delete</button>
      </div>

      { !this.state.showUpdateForm ?

        <div className='bookContent'>
          <div className={ `statusBanner ${this.props.book.status ? 'read' : ''}` }>{ this.props.book.status ? 'Read' : 'Unread' } </div>
          <h3>{ this.props.book.title }</h3>
          <h4>{ this.props.book.author?.join(', ') }</h4>
          { this.props.book.description }
        </div>

        :

        <form id="updateBookForm" onSubmit={ (event) => { this.props.onBookUpdate(this.props.book._id, event, this.state); this.setState({ showUpdateForm: !this.state.showUpdateForm }); } }>
          <label htmlFor={ `bookReadChange-${this.props.book._id}` }>Book Read?</label>
          <input id={ `bookReadChange-${this.props.book._id}` } type='checkbox' name='status' checked={ this.state.status } onChange={ this.handleBookFormChange }></input>

          <label htmlFor={ `bookTitleChange-${this.props.book._id}` }>Book Title:</label>
          <input id={ `bookTitleChange-${this.props.book._id}` } type='text' name='title' value={ this.state.title } onChange={ this.handleBookFormChange }></input>

          <label htmlFor={ `bookAuthorChange-${this.props.book._id}` }>Book Author:</label>
          <input id={ `bookAuthorChange-${this.props.book._id}` } type='text' name='author' value={ this.state.author } onChange={ this.handleBookFormChange }></input>

          <label htmlFor={ `bookDescriptionChange-${this.props.book._id}` }>Book Description:</label>
          <textarea id={ `bookDescriptionChange-${this.props.book._id}` } name='description' value={ this.state.description } onChange={ this.handleBookFormChange }></textarea>
          <input type='submit'></input>
        </form>
      }

</>
  }
}

export default Book;