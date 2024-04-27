import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Input from "../../components/Ui/Inputs/Input";
import Button from "../../components/Ui/Buttons/Button";
import Toast, { ToastType } from "../../components/Ui/Toast/Toast";
import { useUserContext } from "../../context/AuthContext";
import { loginUser } from "../../services/AuthService";
import { toast } from "react-toastify";
import ButtonSpinner from "../../components/Ui/Spinners/ButtonSpinner";

const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password must have at least 8 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const loginMutation = useMutation({
    mutationFn: (user) => loginUser(user),
  });
  const { login } = useUserContext();

  return (
    <div>
      <h2 className="text-3xl mb-5">Login</h2>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);
          try {
            const data = await loginMutation.mutateAsync(values);

            login(data);
          } catch (error) {
            const errorMsg =
              error.body?.non_field_errors?.join(", ") ||
              "Something went wrong, try again";
            if (error.statusCode === 400 && error.body?.non_field_errors) {
              setErrors({ non_field_errors: errorMsg });
            } else {
              toast(
                <Toast
                  type={ToastType.ERROR}
                  message="Something went wrong, try again"
                />
              );
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="self-start">
                Username
              </label>
              <Input type="text" name="username" />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="self-start">
                Password
              </label>
              <Input type="password" name="password" />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            <Button
              className="bg-green-600 hover:bg-green-800"
              type="submit"
              disabled={isSubmitting}
            >
              {!isSubmitting ? "Log in" : <ButtonSpinner className="" />}
            </Button>
            {errors.non_field_errors && (
              <div className="text-red-500">Incorrect username or password</div>
            )}
          </Form>
        )}
      </Formik>
      <div className="mt-6 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
