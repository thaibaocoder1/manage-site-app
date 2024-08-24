import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import classes from "./style.module.css";

const FileController = ({ form, name, label, onPreview }) => {
  const { control } = form;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, ref }, fieldState: { error } }) => (
        <div>
          <label className={classes["upload-label"]} htmlFor={name}>
            {label} - Choose one file
          </label>
          <input
            type="file"
            name={name}
            id={name}
            onBlur={onBlur}
            onChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                onChange(file);
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                  const { result } = e.target;
                  if (result) {
                    onPreview && onPreview(result);
                  }
                };
                fileReader.readAsDataURL(file);
              } else {
                event.target.value = undefined;
              }
            }}
            ref={ref}
          />
          {error && (
            <span className={classes["error-message"]}>{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

FileController.propTypes = {
  form: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  onPreview: PropTypes.func,
};

export default FileController;
