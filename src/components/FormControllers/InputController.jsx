import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import classes from "./style.module.css";

const InputController = ({ form, name, label, type = "text" }) => {
  const { control } = form;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          <label htmlFor={name}>{label}</label>
          <input type={type} name={name} id={name} {...field} />
          {error && (
            <span className={classes["error-message"]}>{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

InputController.propTypes = {
  form: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
};

export default InputController;
