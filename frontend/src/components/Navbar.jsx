import React from 'react'

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-white text-2xl font-extrabold tracking-tight hover:text-yellow-300 transition"
        >
          📝 Notes App
        </Link>

        <Link
          to="/create"
          className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
        >
          + New Note
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
