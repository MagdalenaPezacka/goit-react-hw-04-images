import { useState, useEffect } from 'react';
import { fetchImages, notifySettings } from './fetchImages-api';
import css from './App.module.css';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import Notiflix from 'notiflix';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imagesArr, setImagesArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imageTags, setImageTags] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setIsLoading(true);
    fetchQuery(searchQuery, page);
  }, [searchQuery, page]);

  async function fetchQuery(query, page) {
    try {
      await fetchImages(query, page).then(result => {
        const data = result.data;
        const total = data.totalHits;
        const imagesArr = data.hits;
        const imagesLeft = total - 12 * page;

        if (imagesArr.length === 0) {
          setShowLoadMoreBtn(false);
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.',
            notifySettings
          );
          return;
        } else {
          setImagesArr(prevState => [...prevState, ...imagesArr]);
        }

        if (imagesArr.length > 0 && page === 1) {
          Notiflix.Notify.success(
            `Hooray! We found ${total} images.`,
            notifySettings
          );
        }

        imagesLeft > 0 ? setShowLoadMoreBtn(true) : setShowLoadMoreBtn(false);
      });
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure(
        'Sorry, something went wrong, please try again later',
        notifySettings
      );
    } finally {
      setIsLoading(false);
    }
  }
  const onSubmit = query => {
    setSearchQuery(query);
    setIsLoading(true);
    setImagesArr([]);
    setPage(1);
  };

  const toggleModal = (largeImageURL, imageTags) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setImageTags(imageTags);
  };

  const onLoadMoreBtnClick = () => {
    setPage(prevState => prevState + 1);
    setIsLoading(true);
  };
  return (
    <div className={css.app}>
      <SearchBar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={imagesArr} showModal={toggleModal} />
      <div className={css.app}>
        {showLoadMoreBtn && (
          <Button
            text="Load more"
            status="load"
            onClick={onLoadMoreBtnClick}
            onLoaderPlay={isLoading}
          />
        )}
      </div>
      {isLoading && <Loader />}

      {showModal && (
        <Modal src={largeImageURL} alt={imageTags} closeModal={toggleModal} />
      )}
    </div>
  );
};
// }
