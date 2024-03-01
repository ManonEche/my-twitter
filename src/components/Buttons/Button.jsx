/* eslint-disable react/prop-types */

export default function Button({
    children,
    disabled,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className="block bg-button shadow-md border border-white rounded-xl py-2.5 px-4 shadow-inner-xl text-md hover:bg-drk hover:text-white hover: duration-500 hover:border-drk"
            disabled={disabled}
        >
            {children}
        </button>
    );
}