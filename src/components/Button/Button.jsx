import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ text, type = 'button', onClick = null }) => {
  return (
    <button className={css.button} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};
