import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import classes from "./style.module.css";
import InputController from "../FormControllers/InputController";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter email"),
  password: yup.string().min(6, "Please enter at least 6 characters"),
});

const LoginForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });
  const navigate = useNavigate();
  const { login, isPending } = useLogin();
  const handleSubmitForm = async (data) => {
    const { email, password } = data;
    await login(email, password);
    navigate("/", { replace: true });
  };
  return (
    <form
      onSubmit={form.handleSubmit(handleSubmitForm)}
      className={classes["auth-form"]}
    >
      <h2>Login Form</h2>
      <InputController
        form={form}
        label={"Email"}
        name={"email"}
        type="email"
      />
      <InputController
        form={form}
        label={"Password"}
        name={"password"}
        type="password"
      />
      <button className="btn" type="submit" disabled={isPending}>
        {isPending ? "Submitting" : "Log in"}
      </button>
    </form>
  );
};

export default LoginForm;
