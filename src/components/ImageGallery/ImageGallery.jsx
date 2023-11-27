import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

function GalleryList({ imagesArray, openModal }) {
  return (
    <div className="photo-card">
      {imagesArray.map((image) => (
        <ImageGalleryItem key={image.id} image={image} openModal={openModal} />
      ))}
    </div>
  );
}

GalleryList.propTypes = {
  imagesArray: PropTypes.array.isRequired,
  openModal: PropTypes.func,
};

export default GalleryList;
