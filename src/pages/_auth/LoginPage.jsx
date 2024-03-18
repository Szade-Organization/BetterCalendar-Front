import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';


import Input from '../../components/Ui/Inputs/Input';
import Button from '../../components/Ui/Buttons/Button';
import Toast, { ToastType } from '../../components/Ui/Toast/Toast';
import { useUserContext } from '../../context/AuthContext';
import { loginUser } from '../../services/ActivityService';
import { toast } from 'react-toastify';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must have at least 6 characters').required('Password is required'),
});

const LoginPage = () => {
  const loginMutation = useMutation({
    mutationFn: (user) => loginUser(user),
    onError: () => {
      toast(
        <Toast type={ToastType.ERROR} message="Something went wrong, try again" />
      );
    },
  });
  const { login } = useUserContext();

  return (
    <div>
      <h2 className='text-3xl mb-5'>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const user = await loginMutation.mutateAsync(values);
          login(user);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className='flex flex-col gap-5'>
            <div className='flex flex-col gap-1'>
              <label htmlFor="email" className='self-start'>Email</label>
              <Input type="email" name="email" />
              <ErrorMessage name="email" component="div" className='text-red' />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="password" className='self-start'>Password</label>
              <Input type="password" name="password" />
              <ErrorMessage name="password" component="div" className='text-red' />
            </div>
            <Button className="bg-green-600 hover:bg-green-800" type="submit" disabled={isSubmitting}>
              Log in
            </Button>
          </Form>
        )}
      </Formik>
      <div className="mt-6 text-center">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
