import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className={`text-white font-bold py-2 px-4 rounded-full ${props.className}`}
        >
            {children}
        </button>
    );
};

export default Button;
