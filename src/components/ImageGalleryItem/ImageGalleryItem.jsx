import React from 'react';

function ImageGalleryItem({ image, openModal }) {
  const handleClick = () => {
    openModal(image.largeImageURL);
  };

  return (
    <div key={image.id} className="photo-one-card card" style={{ width: '18rem' }}>
      <a href={image.webformatURL} data-lightbox="image" onClick={handleClick}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          className="card-img-top"
          loading="lazy"
          width="500px"
          height="250px"
        />
      </a>
      <div className="info card-body">
        <p className="info-item card-text">
          <b>Likes:</b> {image.likes}
        </p>
        <p className="info-item card-text">
          <b>Views:</b> {image.views}
        </p>
        <p className="info-item card-text">
          <b>Comments:</b> {image.comments}
        </p>
        <p className="info-item card-text">
          <b>Downloads:</b> {image.downloads}
        </p>
      </div>
    </div>
  );
}

export default ImageGalleryItem;