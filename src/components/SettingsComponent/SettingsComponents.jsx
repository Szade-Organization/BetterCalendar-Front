import Button from "../Ui/Buttons/Button";
import { useUserContext } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import {
  changeEmail,
  changePassword,
  logoutUser,
} from "../../services/AuthService";
import Toast, { ToastType } from "../Ui/Toast/Toast";
import { ErrorMessage, Form, Formik } from "formik";
import Input from "../Ui/Inputs/Input";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ButtonSpinner from "../Ui/Spinners/ButtonSpinner";

const changePasswordValidationSchema = Yup.object().shape({
  old_password: Yup.string()
    .min(8, "Password must have at least 8 characters")
    .required("Password is required"),
  password: Yup.string()
    .min(8, "Password must have at least 8 characters")
    .required("Password is required"),
  password_confirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const SettingsComponents = () => {
  const { logout, user } = useUserContext();

  const logoutMutation = useMutation({
    mutationFn: () => logoutUser(),
    onError: () => {
      toast(
        <Toast
          type={ToastType.ERROR}
          message={"Something went wrong, try again"}
        />
      );
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (changePasswordRequest) =>
      changePassword(changePasswordRequest),
  });

  const changeEmailMutation = useMutation({
    mutationFn: (changeEmailRequest) => changeEmail(changeEmailRequest),
    onError: () => {
      Toast(
        <Toast
          type={ToastType.ERROR}
          message={"Something went wrong, try again"}
        />
      );
    },
  });

  const mutateMail = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    try {
      const data = await changeEmailMutation.mutateAsync(values);
    } catch (error) {
      if (error.statusCode === 400 && error.body) {
        const formikErrors = Object.keys(error.body).reduce((acc, key) => {
          acc[key] = error.body[key].join(", ");
          return acc;
        }, {});
        setErrors(formikErrors);
      } else {
        toast(
          <Toast
            type={ToastType.ERROR}
            message={error.message || "Something went wrong, try again"}
          />
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const mutatePassword = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    try {
      const data = await changePasswordMutation.mutateAsync(values);
    } catch (error) {
      if (error.statusCode === 400 && error.body) {
        const formikErrors = Object.keys(error.body).reduce((acc, key) => {
          acc[key] = error.body[key].join(", ");
          return acc;
        }, {});
        setErrors(formikErrors);
      } else {
        toast(
          <Toast
            type={ToastType.ERROR}
            message={error.message || "Something went wrong, try again"}
          />
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      logout();
    } catch (error) {
      toast(
        <Toast
          type={ToastType.ERROR}
          message={error.message || "Something went wrong, try again"}
        />
      );
    }
  };

  return (
    <div className="h-screen flex items-center">
      <div className="p-5 bg-grey-background rounded-3xl min-w-full pt-16 h-[90%] bg-grey-background">
        <div className="flex flex-col overflow-auto h-[95%] justify-between gap-5 p-3 rounded-lg">
          <div className="shadow-lg rounded-lg bg-white p-8">
            <h2 className="text-3xl font-bold mb-5">Change password</h2>
            <Formik
              initialValues={{
                old_password: "",
                password: "",
                password_confirm: "",
              }}
              validationSchema={changePasswordValidationSchema}
              onSubmit={mutatePassword}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="old_password" className="self-start">
                      Old password
                    </label>
                    <Input type="password" name="old_password" />
                    <ErrorMessage
                      name="old_password"
                      component="div"
                      className="text-red-500 font-semibold"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="self-start">
                      New password
                    </label>
                    <Input type="password" name="password" />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 font-semibold"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="password_confirm" className="self-start">
                      Confirm password
                    </label>
                    <Input type="password" name="password_confirm" />
                    <ErrorMessage
                      name="password_confirm"
                      component="div"
                      className="text-red-500 font-semibold"
                    />
                  </div>

                  <Button
                    className="bg-green-600 hover:bg-green-800"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {!isSubmitting ? "Change password" : <ButtonSpinner />}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>

          <div className="shadow-lg rounded-lg bg-white p-8">
            <h2 className="text-3xl font-bold mb-5">Your email</h2>
            <Formik initialValues={{ email: user.email }} onSubmit={mutateMail}>
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="self-start">
                      Email
                    </label>
                    <Input type="email" name="email" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 font-semibold"
                    />
                  </div>

                  <Button
                    className="bg-green-600 hover:bg-green-800"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {!isSubmitting ? "Change email" : <ButtonSpinner />}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>

          <div className="shadow-lg rounded-lg bg-white p-8">
            <div className="flex flex-col justify-start">
              <Button
                className="bg-red-400"
                onClick={handleLogout}
                disabled={logoutMutation.isLoading}
              >
                {!logoutMutation.isLoading ? "Logout" : <ButtonSpinner />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponents;
