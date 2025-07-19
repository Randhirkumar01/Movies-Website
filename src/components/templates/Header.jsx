import React from "react";
import { Link } from "react-router-dom";

export default function Header({ data }) {
//   console.log(data);
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4), rgba(0,0,0,0.6)),
        url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
      className="w-full h-[50vh] flex flex-col justify-end items-start p-[5%]"
    >
      <h1 className="w-[70%] text-5xl text-white font-bold">
        {data.original_title || data.name || data.title || data.original_name}
      </h1>
      <p className="w-[70%] text-sm text-white mt-3">
        {data.overview.slice(0, 200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">Read more</Link>
      </p>
      <p className="text-white mt-3">
        <i className="text-yellow-500 mr-1 ml-3 ri-megaphone-fill"></i>
        {data.release_date || data.first_air_date ? data.release_date || data.first_air_date : "N/A"}
        <i className="text-yellow-500 mr-1 ml-3 ri-album-fill"></i>
        {data.media_type.toUpperCase() ? data.media_type : "Movie"}
        <i className="text-yellow-500 mr-1 ml-3 ri-volume-up-fill"></i>
        {data.original_language.toUpperCase()}
      </p>
      <div className="mt-5">
        <Link
          to={`/${data.media_type}/details/${data.id}/trailer`}
          className="bg-[#6556cd] text-white px-4 py-2 rounded"
        >
          Watch Trailer
        </Link>
      </div>
    </div>
  );
}
