import { useEffect } from 'react';
import * as basicLightbox from 'basiclightbox';
import './Modal.css';

const Modal = ({ imageURL, onClose, image }) => {
  useEffect(() => {
      const instance = basicLightbox.create(`
  <div class="modal-background">
    <div class="modal">
      <img src="${imageURL}" alt="Large Image" />
    </div>
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

    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      instance.element().removeEventListener('click', handleClose);
      instance.close();
    };
  }, [imageURL, onClose, image]);

  return null;
};

export default Modal;
