import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox: React.FC<CheckboxProps> = ({ ...props }) => {
    return (
        <input
            type="checkbox"
            {...props}
            className={`form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none ${props.className}`}
        />
    );
};

export default Checkbox;
