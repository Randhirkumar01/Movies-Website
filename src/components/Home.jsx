import React, { useState, useEffect } from "react";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import Header from "./templates/Header";
import Dropdown from "./templates/Dropdown";
import HorizontalCards from "./templates/HorizontalCards";
import Loading from "./templates/Loading";
import axios from "../utils/axios";

export default function Home() {
  document.title = "Home - Movies Website";
  const [wallpaper, setWalpaper] = useState(null);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [category, setCategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const data = await axios.get(`/trending/all/day`);
      const randomData =
        data.data.results[(Math.random() * data.data.results.length).toFixed()];
      setWalpaper(randomData);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const GetTrending = async () => {
    try {
      const data = await axios.get(`/trending/${category}/day`);
      setTrending(data.data.results);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const GetUpcoming = async () => {
    try {
      const data = await axios.get(`/movie/upcoming`);
      setUpcoming(data.data.results);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    GetTrending();
    GetUpcoming();
    !wallpaper && GetHeaderWallpaper();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <div className="flex justify-between items-center p-5">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
          <Dropdown
            title="filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
        <div className="flex justify-between items-center p-5">
          <h1 className="text-3xl font-semibold text-zinc-400">
            Upcoming
            <small className="ml-2 text-sm text-zinc-500"> (movie)</small>
          </h1>
        </div>
        <HorizontalCards data={upcoming} />
      </div>
    </>
  ) : (
    <Loading />
  );
}
