import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const signOut = useSignOut();
  let navigate = useNavigate();
  const [dark, setDark] = useState(null);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme == null || dark == null) {
      localStorage.setItem("theme", "light");
      setDark(false);
    }
    if (theme == "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    if (theme == "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  useEffect(() => {
    if (dark == true) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    if (dark == false) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);
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
            <div className="ml-auto flex items-center gap-3">
              <div className="inline-flex gap-3 text-white text-sm items-center">
                <div>
                  <svg
                    className="w-6 h-6 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.3 5A1 1 0 0 0 5 6.2l1.4 1.5a1 1 0 0 0 1.5-1.5L6.3 5Zm12.8 1.3A1 1 0 0 0 17.7 5l-1.5 1.4a1 1 0 0 0 1.5 1.5L19 6.3ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.8 17.7a1 1 0 1 0-1.5-1.5L5 17.7A1 1 0 1 0 6.3 19l1.5-1.4Zm9.9-1.5a1 1 0 0 0-1.5 1.5l1.5 1.4a1 1 0 0 0 1.4-1.4l-1.4-1.5ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultValue=""
                    className="sr-only peer"
                    checked={dark}
                    onChange={(e) => {
                      setDark(e.target.checked);
                    }}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                </label>
                <div>
                  <svg
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.7 2a10 10 0 1 0 9.8 13.3 1 1 0 0 0-1-1.3H20a8 8 0 0 1-7.6-10.6l.1-.4a1 1 0 0 0-.8-1Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <button
                type="button"
                onClick={() => logout()}
                className="text-white  border border-white hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
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
      </div>
    </nav>
  );
}
