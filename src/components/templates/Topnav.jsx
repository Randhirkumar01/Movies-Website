import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noImage from "/no-image.jpeg";

export default function Topnav() {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const data = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.data.results);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-[80%] h-[10vh] relative text-zinc-400 mx-auto flex items-center">
      <i className="text-3xl ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        className="w-[50%] mx-10 p-5 text-xl outline-none border-none"
        placeholder="Search for movies, series..."
        name="search"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-3xl ri-close-fill r-0"
        ></i>
      )}

      <div className="z-[100] w-[60%] max-h-[50vh] absolute bg-zinc-200 top-[100%] left-[5%] overflow-auto rounded">
        {searches &&
          searches.map((search, index) => (
            <Link
              to={`/${search.media_type}/details/${search.id || search.movie_id}`}
              key={index}
              className="flex justify-start items-center w-[100%] p-5 border-b-1 border-zinc-100
              text-zinc-600 font-semibold hover:text-black hover:bg-zinc-300 transition-all duration-500"
            >
              <img
                className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
                src={
                  search.backdrop_path || search.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        search.backdrop_path || search.profile_path
                      }`
                    : noImage
                }
                alt=""
              />
              <span>
                {search.original_title ||
                  search.name ||
                  search.title ||
                  search.original_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
