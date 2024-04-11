import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useUserContext } from '../../context/AuthContext';
import Button from '../../components/Ui/Buttons/Button';
import Input from '../../components/Ui/Inputs/Input';
import Toast, { ToastType } from '../../components/Ui/Toast/Toast';
import { createUserAccount } from '../../services/AuthService';
import ButtonSpinner from '../../components/Ui/Spinners/ButtonSpinner';


const registerValidationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must have at least 8 characters').required('Password is required'),
    password_confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const RegisterPage = () => {

    const registerMutation = useMutation({
        mutationFn: createUserAccount,

    });

    const { login } = useUserContext();

    return (
        <div>
            <h2 className='text-3xl mb-5'>Register</h2>
            <Formik
                initialValues={{ username: '', email: '', password: '', password_confirm: '' }}
                validationSchema={registerValidationSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    setSubmitting(true);
                    try {
                        const user = await registerMutation.mutateAsync(values);
                        login(user);
                    } catch (error) {

                        if (error.statusCode === 400 && error.body) {

                            const formikErrors = Object.keys(error.body).reduce((acc, key) => {

                                if (key === 'email') {
                                    acc[key] = 'Email already in use';
                                } else if (key === 'username') {
                                    acc[key] = 'Username already in use';
                                } else {

                                    acc[key] = error.body[key].join(', ');
                                }
                                return acc;
                            }, {});
                            setErrors(formikErrors);
                        } else {
                            toast(<Toast type={ToastType.ERROR} message={error.message || "Something went wrong, try again"} />);
                        }
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="username" className='self-start'>Username</label>
                            <Input type="text" name="username" />
                            <ErrorMessage name="username" component="div" className='text-red-500' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="email" className='self-start'>Email</label>
                            <Input type="email" name="email" />
                            <ErrorMessage name="email" component="div" className='text-red-500' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="password" className='self-start'>Password</label>
                            <Input type="password" name="password" />
                            <ErrorMessage name="password" component="div" className='text-red-500' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="password_confirm" className='self-start'>Confirm Password</label>
                            <Input type="password" name="password_confirm" />
                            <ErrorMessage name="password_confirm" component="div" className='text-red-500' />
                        </div>
                        <Button className="bg-green-600 hover:bg-green-800" type="submit" disabled={isSubmitting}>
                          {!isSubmitting ? 'Register' : <ButtonSpinner className="" />}
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
