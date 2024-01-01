
const Button = ({ children, className, ...props }) => {
    return (
        <button
            {...props}
            className={`${className} text-white font-bold py-2 px-4 rounded-full`}
        >
            {children}
        </button>
    );
};

export default Button;
