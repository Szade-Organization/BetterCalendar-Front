import React from 'react';

const Checkbox = (props) => {
    return (
        <input
            type="checkbox"
            {...props}
            className={`form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none ${props.className}`}
        />
    );
};

export default Checkbox;
