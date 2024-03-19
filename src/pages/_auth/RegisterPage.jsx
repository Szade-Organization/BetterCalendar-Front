import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useUserContext } from '../../context/AuthContext';
import Button from '../../components/Ui/Buttons/Button';
import Input from '../../components/Ui/Inputs/Input';
import Toast, { ToastType } from '../../components/Ui/Toast/Toast';
import { createUserAccount } from '../../services/ActivityService';


const loginValidationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must have at least 6 characters').required('Password is required'),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const RegisterPage = () => {
    const registerMutation = useMutation({
        mutationFn: (user) => createUserAccount(user),
        onError: () => {
            toast(
                <Toast type={ToastType.ERROR} message="Something went wrong, try again" />
            );
        },
    });
    const { login } = useUserContext();

    return (
        <div>
            <h2 className='text-3xl mb-5'>Register</h2>
            <Formik
                initialValues={{ username: '', email: '', password: '', passwordConfirm: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    const user = await registerMutation.mutateAsync(values);
                    login(user);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="username" className='self-start'>Username</label>
                            <Input type="text" name="username" />
                            <ErrorMessage name="username" component="div" className='text-red' />
                        </div>
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
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="passwordConfirm" className='self-start'>Confirm Password</label>
                            <Input type="password" name="passwordConfirm" />
                            <ErrorMessage name="passwordConfirm" component="div" className='text-red' />
                        </div>
                        <Button className="bg-green-600 hover:bg-green-800" type="submit" disabled={isSubmitting}>
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
            <div className="mt-6 text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Log in
                </Link>
            </div>
        </div>
    );
}

export default RegisterPage;
