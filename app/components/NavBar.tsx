import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div>
      <nav className="bg-white p-2 flex justify-between">
        <Link href={"/"} className="font-bold text-gray-700 text-2xl">
          OpenTable
        </Link>
        <div>
          <div className="flex">
            <button className="bg-blue-600 hover:bg-blue-500 text-white border p-1 px-4 rounded mr-3 py-[7px]">
              Sign in
            </button>
            <button className="border p-1 px-4 rounded py-[7px]">
              Sign up
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
