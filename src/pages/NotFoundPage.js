import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div
        className="
    flex flex-col
    bg-white
    shadow-md
    px-4
    sm:px-6
    md:px-8
    lg:px-10
    py-8
    rounded-3xl
    w-50
    max-w-md
  "
      >
        <div className="font-medium self-center text-xl sm:text-4xl text-gray-800">
          404
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Nothing found!
        </div>
      </div>
      <div className="flex justify-center items-center mt-6">
        <Link to="/" className="text-xs ml-2 text-blue-500 font-semibold">
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
