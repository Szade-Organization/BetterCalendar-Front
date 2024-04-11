import { Field } from "formik";

const Input = ({ ...props }) => {
  return (
    <Field
      as="input"
      {...props}
      className={`border border-gray-300 focus:border-blue-500 focus:ring-blue-200 focus:ring-2 focus:outline-none rounded-md shadow-sm p-2 ${props.className}`}
    />
  );
};

export default Input;
