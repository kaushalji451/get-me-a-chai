"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setShowdropdown] = useState(false);
  // console.log(session)
  return (
    <>
      <nav className="bg-slate-800 sm:flex justify-between px-10 items-center ">
        <Link className="flex sm:justify-center items-center gap-1" href={"/"}>
          <img src="/tea.gif" alt="" className="w-8 pb-1" />
          <div className="text-white font-bold  text-2xl sm:text-xl">Get Me A Chai!</div>
        </Link>

        {/* dropdown */}
        <div className="relative  flex justify-center items-center gap-3 p-2">
          {session && (
            <>
              {/* Dropdown Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowdropdown((prev) => !prev);
                }}
                onBlur={(e) => {
                  if (
                    !e.relatedTarget ||
                    !e.currentTarget.contains(e.relatedTarget)
                  ) {
                    setTimeout(() => {
                      setShowdropdown(false);
                    }, 200);
                  }
                }}
                className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center"
              >
                {session && session.user.email}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`z-10 ${
                  showdropdown ? "" : "hidden"
                } absolute left-25 mt-45 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${session.user.name}`}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Your Page
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}

          {session && (
            <div>
              <button
                onClick={() => signOut()}
                type="button"
                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Logout
              </button>
            </div>
          )}

          {!session && (
            <div >
              <Link href="/login">
                <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
