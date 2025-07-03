'use client';

import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import notFoundAnimation from '../assets/not-found-animation.json';

const UserNotFound = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-red-600 mb-4">
          404 - User Not Found!
        </h1>

        <p className="text-xl text-gray-700 mb-8">
          Sorry, the user {username} you are looking for does not exist.
        </p>

        <div className="w-[300px] h-[300px] mx-auto mb-6">
          <Lottie animationData={notFoundAnimation} loop />
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UserNotFound;
