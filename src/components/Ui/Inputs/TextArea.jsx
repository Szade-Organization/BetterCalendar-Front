import { useField } from 'formik';

const TextArea = ({ ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <textarea {...field} {...props}
                className={`border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-md shadow-sm p-2 ${props.className || ''}`}
            />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

export default TextArea;
