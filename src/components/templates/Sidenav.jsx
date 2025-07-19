import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Sidenav() {
  return (
    <div className="w-[20%] h-full border-zinc-400 border-r-1 p-3 py-5">
      <h1 className="text-2xl text-white font-bold">
        <i className="text-[#6556cd] mr-2 ri-tv-fill"></i>
        <span className="text-[#6556cd] font-bold">Movies</span> Website
      </h1>
      <nav className="flex flex-col mt-8 text-zinc-400 gap-2">
        <h1 className="text-white font-semibold text-xl mb-5">New Releases</h1>
        <Link
          to="/trending"
          className="hover:bg-[#6556cd] hover:text-white rounded-lg transition-all duration-500 px-5 py-2"
        >
          <i className="ri-fire-fill mr-2"></i>
          Trending
        </Link>
        <Link
          to="/popular"
          className="hover:bg-[#6556cd] hover:text-white rounded-lg transition-all duration-500 px-5 py-2"
        >
          <i className="ri-bard-fill mr-2"></i>
          Popular
        </Link>
        <Link
          to="/movie"
          className="hover:bg-[#6556cd] hover:text-white rounded-lg transition-all duration-500 px-5 py-2"
        >
          <i className="ri-movie-2-fill mr-2"></i>
          Movies
        </Link>
        <Link
          to="/tv"
          className="hover:bg-[#6556cd] hover:text-white rounded-lg transition-all duration-500 px-5 py-2"
        >
          <i className="ri-tv-2-fill mr-2"></i>
          TV Shows
        </Link>
        <Link
          to="/person"
          className="hover:bg-[#6556cd] hover:text-white rounded-lg transition-all duration-500 px-5 py-2"
        >
          <i className="ri-group-fill mr-2"></i>
          People
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400 my-2" />
      <nav className="flex flex-col mt-5 text-zinc-400 gap-2">
        <h1 className="text-white font-semibold text-xl mb-2">
          Website Information
        </h1>
        <Link className="hover:bg-[#6556cd] hover:text-white rounded-lg transition-all duration-500 px-5 py-2">
          <i className="ri-information-fill mr-2"></i>
          About Us
        </Link>
        <Link className="hover:bg-[#6556cd] hover:text-white rounded-lg transition-all duration-500 px-5 py-2">
          <i className="ri-phone-fill mr-2"></i>
          Contact Us
        </Link>
      </nav>
    </div>
  );
}
