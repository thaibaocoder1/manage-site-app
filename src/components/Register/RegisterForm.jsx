import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useSignup } from "../../hooks/useSignup";
import { isValidFileType } from "../../utils/validation";
import Avatar from "../Avatar/Avatar";
import FileController from "../FormControllers/FileController";
import InputController from "../FormControllers/InputController";
import classes from "./style.module.css";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter email"),
  password: yup.string().min(6, "Please enter at least 6 characters"),
  username: yup.string().required("Please enter username"),
  thumbnail: yup
    .mixed()
    .test("is-file-present", "You need to select a file", (value) => {
      return value != null;
    })
    .test("is-valid-type", "Not a valid image type", (value) => {
      if (!value) return true;
      return isValidFileType(value && value.name.toLowerCase(), "image");
    }),
});

const RegisterForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
      thumbnail: undefined,
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });
  const navigate = useNavigate();
  const [preview, setPreview] = useState();
  const { signup, isPending, error } = useSignup();
  const handleSubmitForm = async (data) => {
    const { email, password, username, thumbnail } = data;
    await signup(email, password, username, thumbnail);
    navigate("/login");
  };

  const handlePreviewImage = (imageUrl) => {
    imageUrl && setPreview(imageUrl);
  };
  return (
    <form
      onSubmit={form.handleSubmit(handleSubmitForm)}
      className={classes["auth-form"]}
    >
      <h2>Sign-up Form</h2>
      <InputController
        form={form}
        label={"Email"}
        name={"email"}
        type="email"
      />
      <InputController form={form} label={"Username"} name={"username"} />
      <InputController
        form={form}
        label={"Password"}
        name={"password"}
        type="password"
      />
      <FileController
        form={form}
        label={"Thumbnail"}
        name={"thumbnail"}
        onPreview={handlePreviewImage}
      />
      {preview && <Avatar imageUrl={preview} />}
      <button className="btn" type="submit" disabled={isPending}>
        {isPending ? "Submitting" : "Register"}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default RegisterForm;
