import React, { useEffect, useState } from 'react';
import './ImageGalleryItem.css'; // Создайте файл ImageGalleryItem.css для стилей

function ImageGalleryItem({ image }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        closeModal();
      }
    }
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      }
   
  }, []);  

  return (
    <div className="photo-one-card card" style={{ width: '18rem' }}>
      <img
  src={image.webformatURL}
  alt={image.tags} // eslint-disable-next-line
  className="card-img-top"
  loading="lazy"
  width="500px"
  height="250px"
  onClick={openModal}
  style={{ cursor: 'pointer' }}
/>


      {isModalOpen && (
  <div className="modal-container">
    <div className="modal-background" onClick={closeModal}></div>
    <div className="modal">
      {/* eslint-disable-next-line */}
      <img src={image.largeImageURL} alt="Large Image" onClick={closeModal} />
    </div>
  </div>
)}


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
