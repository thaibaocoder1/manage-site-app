import PropTypes from "prop-types";
import classes from "./style.module.css";

const Avatar = ({ imageUrl }) => {
  return (
    <figure className={classes.thumbnail}>
      <img src={imageUrl} alt="Avatar" />
    </figure>
  );
};

Avatar.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default Avatar;
