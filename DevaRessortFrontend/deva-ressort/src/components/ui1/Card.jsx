export function Card({ children, className }) {
    return <div className={`p-6 bg-white shadow-lg rounded-lg ${className}`}>{children}</div>;
  }