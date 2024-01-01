import React from 'react';

const Select = ({ options, ...props }) => {
    return (
        <select
            {...props}
            className={`border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-md shadow-sm p-2 ${props.className || ''}`}
        >
            {options?.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
            {props.children}
        </select>
    );
};

export default Select;
