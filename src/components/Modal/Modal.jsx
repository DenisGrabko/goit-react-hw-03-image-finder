// Modal.jsx
import React, { useEffect } from 'react';
import * as basicLightbox from 'basiclightbox';

const Modal = ({ imageURL, onClose }) => {
  useEffect(() => {
    const instance = basicLightbox.create(`
      <div class="modal">
        <img src="${imageURL}" alt="Large Image" />
      </div>
    `);

    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        instance.close();
      }
    };

    const handleClose = () => {
      instance.close();
      onClose();
    };

    instance.show();

    document.addEventListener('keydown', handleKeyDown);
    instance.element().addEventListener('click', handleClose);

    // Очистка при размонтировании компонента
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      instance.element().removeEventListener('click', handleClose);
      instance.close();
    };
  }, [imageURL, onClose]);

  return null;
};

export default Modal;
