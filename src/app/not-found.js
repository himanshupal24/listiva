import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link href="/">
        <span className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition cursor-pointer">
          Go back to Home
        </span>
      </Link>
    </div>
  );
}
