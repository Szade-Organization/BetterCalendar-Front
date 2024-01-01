import React from 'react';

const Input = (props) => {
    return (
        <input
            {...props}
            className={`border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-md shadow-sm p-2 ${props.className}`}
        />
    );
};

export default Input;
