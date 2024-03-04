/* eslint-disable react/prop-types */

export default function ButtonFollower({
  children,
  disabled,
  onClick,
}) {
  return (
      <button
          onClick={onClick}
          className="block w-32 bg-button shadow-md rounded-xl 
          py-2.5 px-2 shadow-inner-xl text-md hover:bg-follow hover: duration-700"
          disabled={disabled}
      >
          {children}
      </button>
  );
}