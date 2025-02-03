import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex justify-center items-center text-white text-2xl md:text-4xl font-bold hover:text-gray-200 transition-colors"
    >
      <h1 className="uppercase italic">quienela</h1>
    </Link>
  );
}