import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { fetchItemsByTag } from '../src/components/Find.photo.api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Searchbar from '../src/components/SearchBar/SearchBar';
import Loader from './components/Loader/Loader';
//import Modal from './components/Modal/Modal';
import 'simplelightbox/dist/simple-lightbox.min.css';

class App extends Component {
  state = {
    isLoading: false,
    error: '',
    searchQuery: '',
    page: 1,
    imagesArray: [],
    loadMoreActive: false,
  };

  openModal = (imageUrl) => {
    this.modalRef.openModal(imageUrl);
  };

  formSubmitHandler = (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    const { searchQuery, page } = this.state;

    if (searchQuery.trim() === '') {
      Notiflix.Notify.failure('Empty field');
      return;
    }

    fetchItemsByTag(searchQuery, page)
      .then((newImagesArray) => {
        if (newImagesArray.length === 0) {
          Notiflix.Notify.failure('No images found.');
        } else {
          this.setState((prevState) => ({
            ...prevState,
            imagesArray: newImagesArray,
            loadMoreActive: true,
          }));
        }
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        Notiflix.Notify.failure('Error fetching images.');
        this.setState({ isLoading: false });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  loadMoreHandler = () => {
    const { searchQuery, page, loadMoreActive } = this.state;

    if (!loadMoreActive) {
      return;
    }

    fetchItemsByTag(searchQuery, page + 1)
      .then((newImages) => {
        if (newImages.length === 0) {
          Notiflix.Notify.info('No more images to load.');
        } else {
          this.setState((prevState) => ({
            ...prevState,
            imagesArray: [...prevState.imagesArray, ...newImages],
            page: prevState.page + 1,
          }));
        }
      })
      .catch((error) => {
        console.error('Error fetching more images:', error);
        Notiflix.Notify.failure('Error fetching more images.');
      });
  };

  toggleLoadMoreButton = () => {
    const { loadMoreActive, imagesArray } = this.state;
    return loadMoreActive && imagesArray.length > 0;
  };

  render() {
    const { searchQuery, imagesArray, isLoading, openModal } = this.state;

    return (
      <div className="app">
        {isLoading && <Loader />}
        <form className="search-form form-inline" onSubmit={this.formSubmitHandler}>
          <Searchbar
            onChange={(e) => this.setState({ searchQuery: e.target.value })}
            onSubmit={searchQuery}
          />
          <button
            type="submit"
            className="btn btn-primary my-2 my-sm-0"
            style={{ width: '550px', height: '60px' }}
          >
            Search
          </button>
        </form>

        <ImageGallery imagesArray={imagesArray} openModal={openModal} />

        <Button
          searchQuery={searchQuery}
          page={this.state.page}
          loadMoreActive={this.state.loadMoreActive}
          imagesArray={this.state.imagesArray}
          loadMoreHandler={this.loadMoreHandler}
        />

        {/* <Modal ref={(modalRef) => (this.modalRef = modalRef)} /> */}
      </div>
    );
  }
}

export default App;
