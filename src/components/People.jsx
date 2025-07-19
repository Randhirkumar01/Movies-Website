import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import axios from "../utils/axios";
import Cards from "./templates/Cards";
import Loader from "./templates/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

export default function People() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "People - Movies Website";

  const GetPerson = async () => {
    try {
      const data = await axios.get(`person/${category}?page=${page}`);
      if (data.data.results.length > 0) {
        setPerson((prev) => [...prev, ...data.data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const refershHandler = () => {
    if (person.length === 0) {
      GetPerson();
    } else {
      setPage(1);
      setPerson([]);
      GetPerson();
    }
  };

  useEffect(() => {
    refershHandler();
  }, [category]);

  return person.length > 0 ? (
    <div className="w-full h-screen">
      <div className="w-full flex items-center justify-between px-[5%] pb-[3%] pt-[1%] ">
        <h1 className="text-2xl text-zinc-400 font-semibold ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] ri-arrow-left-line"
          ></i>
          Person
          <small className="ml-2 text-sm text-zinc-500">({category})</small>
        </h1>
        <div className="flex items-center w-[80%] ">
          <Topnav />
        </div>
      </div>
      <InfiniteScroll
        dataLength={person.length}
        next={GetPerson}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <Cards data={person} title='person' />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}
