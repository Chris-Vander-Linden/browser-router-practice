import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Home.css'

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      index: 0,
      modalShow: false,
      selectedBook: null
    }
  }

  handleSelect = (selectedIndex, e) => {
    this.setState({ index: selectedIndex });
  }

  render() {

    const carouselItems = this.props.bookData.map(item => (
      <Carousel.Item key={ item._id }>
        <img src={ item.image } alt={ item.title } />
        <Carousel.Caption>
          <Button variant="primary" onClick={ () => this.setState({
            modalShow: true,
            selectedBook: item._id
          }) }>
            Read More
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    ));

    return (
      <div className='contentContainer'>
        <h2>Home</h2>
        <p>Note: books might take 30 seconds to load the first time, since the backend is hosted on the free version of Render.</p>

        <Carousel activeIndex={ this.state.index } onSelect={ this.handleSelect }>
          { carouselItems }
        </Carousel>

        <Modal
          show={ this.state.modalShow }
          onHide={ () => this.setState({ modalShow: false }) }
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              { this.props.bookData.filter(book => book._id === this.state.selectedBook)[0]?.title }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              { this.props.bookData.filter(book => book._id === this.state.selectedBook)[0]?.description }
            </p>
          </Modal.Body>
        </Modal>


        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae mollitia voluptate quidem error. Sint dignissimos nulla quos, unde amet maxime laborum repellendus quae soluta in distinctio ipsum veritatis laboriosam sequi, qui porro perferendis corrupti! Modi nemo ad blanditiis aliquid reiciendis suscipit ea atque velit officia? Eum possimus dignissimos exercitationem aut mollitia impedit voluptatibus inventore sint culpa sit magnam quisquam aliquid minima ducimus voluptas rem, autem suscipit nostrum recusandae enim consequatur. Nesciunt, delectus ea repudiandae eum blanditiis, quisquam voluptatum modi nihil in tempore est veritatis molestiae facere ex distinctio molestias. Quam veritatis facere tenetur, numquam autem quas dolorum sapiente dignissimos. Dignissimos non suscipit repellendus mollitia fugit quas dolorem eos fuga soluta delectus nemo laboriosam a, eaque id? Laudantium animi ducimus aperiam nesciunt, nulla quisquam?</p>
      </div>
    )
  }
}

export default Home;
