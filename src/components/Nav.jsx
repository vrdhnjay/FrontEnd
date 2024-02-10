import React from "react";
import { Link } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const signOut = useSignOut();
  let navigate = useNavigate();

  const logout = () => {
    try {
      signOut();
      navigate("/login");
    } catch {
      throw Error();
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center w-full">
            <div className="flex-shrink-0">
              <h3 className="text-white font-bold">
                <Link to="/">Shopping List App</Link>
              </h3>
            </div>
            <button
              type="button"
              onClick={() => logout()}
              className="text-white ml-auto border border-white hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign Out
              <svg
                className="w-5 h-5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
