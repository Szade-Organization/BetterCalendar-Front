import { Field } from 'formik';

const Select = ({ children, ...props }) => {
    return (
        <Field as="select"
            {...props}
            className={`border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-md shadow-sm p-2 ${props.className || ''}`}
        >
            {children}
        </Field>
    );
};

export default Select;
