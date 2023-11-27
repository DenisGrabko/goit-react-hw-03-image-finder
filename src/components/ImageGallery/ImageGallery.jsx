import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';

function GalleryList({ imagesArray, openModal }) {
  return (
    <div className="photo-card">
      {imagesArray.map((image) => (
        <ImageGalleryItem key={nanoid()} image={image} openModal={openModal} />
      ))}
    </div>
  );
}

GalleryList.propTypes = {
  imagesArray: PropTypes.array.isRequired,
  openModal: PropTypes.func,
};

export default GalleryList;
