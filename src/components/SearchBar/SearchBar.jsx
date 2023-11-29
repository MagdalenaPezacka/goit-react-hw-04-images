import { useState } from 'react';
import PropTypes from 'prop-types';
import { LuSearch } from 'react-icons/lu';
import css from './SearchBar.module.css';
import { notifySettings } from '../fetchImages-api';
import Notiflix from 'notiflix';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onInputChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      return Notiflix.Notify.warning(
        'Please enter key words for search.',
        notifySettings
      );
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button
          className={css.searchForm__button}
          type="submit"
          text="Search"
          status="search"
        >
          <LuSearch size={22}></LuSearch>
        </button>

        <input
          className={css.searchForm__input}
          value={query}
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          required
          placeholder="Search images and photos"
          onChange={onInputChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
