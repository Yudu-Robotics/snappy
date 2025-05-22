"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { resetReceivers } from "./redux/feature/remoteSlice/remoteSlice";

export default function Home() {
  const dispatch = useDispatch();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Remote Control Management
        </h1>
        <div className="flex flex-col gap-4">
          <Link href="/add-remote">
            <button
              onClick={() => dispatch(resetReceivers())}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors duration-200 shadow-md"
            >
              Add Receiver And Remote
            </button>
          </Link>
          <Link href="/check-remotes">
            <button className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors duration-200 shadow-md">
              Check Remotes and Take Test
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
