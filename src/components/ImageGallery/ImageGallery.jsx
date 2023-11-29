import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, showModal }) => {
  return (
    <ul className={css.imageGallery}>
      {images.map((image, index) => {
        // console.log(image);
        return (
          <ImageGalleryItem
            key={index}
            webformatURL={image.webformatURL}
            tags={image.tags}
            largeImageURL={image.largeImageURL}
            showModal={showModal}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  showModal: PropTypes.func.isRequired,
};
