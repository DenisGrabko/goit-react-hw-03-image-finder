import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('click', this.handleBackgroundClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleBackgroundClick);
  }

  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackgroundClick = (e) => {
    if (e.target.classList.contains('modal-background')) {
      this.props.onClose();
    }
  };

  render() {
    const { imageURL } = this.props;

    return (
      <div className="modal-background" onClick={this.handleBackgroundClick}>
        <div className="modal">
          <img src={imageURL} alt="Large Image"  />
        </div>
      </div>
    );
  }
}

export default Modal;
