import { useEffect } from 'react';

import PropTypes from 'prop-types';
import css from './Modal.module.css';

// export const Modal = ({ closeModal, largeImageURL }) => {
//   useEffect(() => {
//     const handleKeyDown = e => {
//       if (e.keyCode === 27 || e.currentTarget === e.target) {
//         return closeModal();
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [closeModal]);

export const Modal = ({ src, alt, closeModal }) => {
  useEffect(() => {
    const onEscPress = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onEscPress);

    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
  }, [closeModal]);

  return (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
