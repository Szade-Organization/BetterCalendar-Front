import React from 'react';

const Button = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ${props.className}`}
        >
            {children}
        </button>
    );
};

export default Button;
