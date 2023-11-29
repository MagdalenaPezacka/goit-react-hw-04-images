import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  showModal,
}) => {
  return (
    <>
      <li className={css.imageGalleryItem}>
        <img
          onClick={() => showModal(largeImageURL, tags)}
          className={css.imageGalleryItem__image}
          src={webformatURL}
          alt={tags}
          largeimage={largeImageURL}
        />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  showModal: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
