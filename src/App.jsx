import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { fetchItemsByTag } from '../src/components/Find.photo.api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal'; 
import 'simplelightbox/dist/simple-lightbox.min.css';

class App extends Component {
  state = {
    isLoading: false,
    error: '',
    searchQuery: '',
    page: 1,
    imagesArray: [],
    loadMoreActive: false,
    showModal: false, 
    currentImageUrl: '', 
  };  

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.page !== this.state.page ||
      prevState.searchQuery !== this.state.searchQuery) {
      this.fetchItemsByTag(this.state.searchQuery, this.state.page);
    }
  }

  openModal = (imageUrl) => {
    this.setState({ showModal: true, currentImageUrl: imageUrl });
  };

  closeModal = () => {
    this.setState({ showModal: false, currentImageUrl: '' });
  };

  formSubmitHandler = (searchQuery) => {
    this.setState({ isLoading: true, searchQuery, page: 1 });

    if (searchQuery.trim() === '') {
      Notiflix.Notify.failure('Empty field');
      return;
    }    
    
    this.fetchItemsByTag(searchQuery, 1);
  };

  fetchItemsByTag = (searchQuery, page) => {
    fetchItemsByTag(searchQuery, page)
      .then((newImagesArray) => {
        if (newImagesArray.length === 0) {
          Notiflix.Notify.failure('No images found.');
        } else {
          this.setState((prevState) => {
            const nextState = {
              imagesArray: page === 1 ? newImagesArray : [...prevState.imagesArray, ...newImagesArray],
              loadMoreActive: newImagesArray.length === 12,
            };
            return nextState;
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        Notiflix.Notify.failure('Error fetching images.');
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  loadMoreHandler = () => {
    const { searchQuery, loadMoreActive } = this.state;

    if (!loadMoreActive) {
      return;
    }

    this.setState((prevState) => ({
      page: prevState.page + 1,
    }), () => {
      this.fetchItemsByTag(searchQuery, this.state.page);
    });
  };

  render() {
    const { searchQuery, imagesArray, isLoading, showModal, currentImageUrl, loadMoreActive } = this.state;

    return (
      <div className="app">
        {isLoading && <Loader />}
        <SearchBar formSubmitHandler={this.formSubmitHandler} />
        <ImageGallery imagesArray={imagesArray} openModal={this.openModal} />
        <Button
          searchQuery={searchQuery}
          page={this.state.page}
          loadMoreActive={loadMoreActive}
          imagesArray={this.state.imagesArray}
          loadMoreHandler={this.loadMoreHandler}
        />
        {showModal && (
          <Modal imageURL={currentImageUrl} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
