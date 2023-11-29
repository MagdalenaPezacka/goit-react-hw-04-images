// import { Component } from 'react';
// import { fetchImages, notifySettings } from './fetchImages-api';
// import css from './App.module.css';

// import { SearchBar } from './SearchBar/SearchBar';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Loader } from './Loader/Loader';
// import { Modal } from './Modal/Modal';
// import { Button } from './Button/Button';
// import Notiflix from 'notiflix';

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     page: 1,
//     imagesArr: [],
//     isLoading: false,
//     showModal: false,
//     showLoadMoreBtn: false,
//     largeImageURL: '',
//     imageTags: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       this.state.searchQuery !== prevState.searchQuery ||
//       this.state.page !== prevState.page
//     ) {
//       this.setState({ isLoading: true });
//       this.fetchQuery(this.state.searchQuery, this.state.page);
//     }
//   }

//   onSubmit = FormData => {
//     const { query } = FormData;
//     this.setState({ searchQuery: query, page: 1, imagesArr: [] });
//   };

//   async fetchQuery(query, page) {
//     try {
//       await fetchImages(query, page).then(result => {
//         const data = result.data;
//         const total = data.totalHits;
//         const imagesArr = data.hits;
//         const imagesLeft = total - 12 * this.state.page;

//         if (imagesArr.length === 0) {
//           this.setState({ showLoadMoreBtn: false });
//           Notiflix.Notify.failure(
//             'Sorry, there are no images matching your search query. Please try again.',
//             notifySettings
//           );
//           return;
//         } else {
//           this.setState(prevState => ({
//             imagesArr: [...prevState.imagesArr, ...imagesArr],
//           }));
//         }

//         if (imagesArr.length > 0 && this.state.page === 1) {
//           Notiflix.Notify.success(
//             `Hooray! We found ${total} images.`,
//             notifySettings
//           );
//         }

//         imagesLeft > 0
//           ? this.setState({ showLoadMoreBtn: true })
//           : this.setState({ showLoadMoreBtn: false });
//       });
//     } catch (error) {
//       console.log(error);
//       Notiflix.Notify.failure(
//         'Sorry, something went wrong, please try again later',
//         notifySettings
//       );
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   }

//   toggleModal = (largeImageURL, imageTags) => {
//     this.setState(prevState => ({
//       showModal: !prevState.showModal,
//       largeImageURL: largeImageURL,
//       imageTags: imageTags,
//     }));
//   };

//   onLoadMoreBtnClick = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { loading } = this.state;
//     return (
//       <div className={css.app}>
//         <SearchBar onSubmit={this.onSubmit} />
//         {loading && <Loader />}

//         <div className={css.app}>
//           <ImageGallery
//             images={this.state.imagesArr}
//             showModal={this.toggleModal}
//           />

//           {this.state.showLoadMoreBtn && (
//             <Button
//               text="Load more"
//               status="load"
//               onClick={this.onLoadMoreBtnClick}
//               onLoaderPlay={this.state.isLoading}
//             />
//           )}
//         </div>
//         {this.state.isLoading && <Loader />}

//         {this.state.showModal && (
//           <Modal
//             src={this.state.largeImageURL}
//             alt={this.state.imageTags}
//             closeModal={this.toggleModal}
//           />
//         )}
//       </div>
//     );
//   }
// }
