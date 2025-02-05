/**
 * Container component that provides a responsive and centered layout.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the container.
 * @returns {JSX.Element} The rendered container component.
 */
function Container({ children }) {
  return <div className="w-full max-w-9xl sm:mx-auto px-4">{children}</div>;
}

export default Container;
