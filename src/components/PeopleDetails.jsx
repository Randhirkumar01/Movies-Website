import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/peopleActions";
import Loader from "./templates/Loading";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";

export default function PeopleDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");
  // console.log(info);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson()); // Clean up the effect
    };
  }, [id]);

  return info ? (
    <div className="px-[10%] w-full flex flex-col ">
      {/* Navbar */}
      <nav className="items-center text-zinc-100 text-2xl mt-5 ">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556cd] ri-arrow-left-line"
        ></Link>
      </nav>

      {/* Poster and Details */}
      <div className="w-full flex gap-5 my-5">
        <div className="w-[20%]">
          <img
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt={info.detail.title}
            className="w-full h-[34vh] object-contain shadow-[-4px_-2px_20px_10px_rgba(0,0,0,0.6)] mb-10"
          />
          <hr className="border-1 border-zinc-400 mb-5" />
          {/* Social Media Links */}
          <div className="flex justify-around items-center text-2xl text-white">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="hover:text-[#6556cd] ri-earth-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="hover:text-[#6556cd] ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="hover:text-[#6556cd] ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="hover:text-[#6556cd] ri-twitter-x-fill"></i>
            </a>
          </div>
          <hr className="border-1 border-zinc-400 mt-5 mb-5" />
          <h1 className="text-2xl font-semibold text-zinc-400 my-2">
            Personal Info
          </h1>
          <h4 className="text-gray-400 text-lg font-semibold">Known For</h4>
          <p className="text-gray-400">
            {info.detail.known_for_department || "Not specified"}
          </p>
          <h4 className="text-gray-400 text-lg font-semibold mt-2">Gender</h4>
          <p className="text-gray-400">
            {info.detail.gender === 1 ? "Female" : "Male"}
          </p>
          <h4 className="text-gray-400 text-lg font-semibold mt-2">Birthday</h4>
          <p className="text-gray-400">
            {info.detail.birthday || "Not specified"}
          </p>
          <h4 className="text-gray-400 text-lg font-semibold mt-2">
            Death Day
          </h4>
          <p className="text-gray-400">
            {info.detail.deathday || "Still Alive"}
          </p>
          <h4 className="text-gray-400 text-lg font-semibold mt-2">
            Place of birth
          </h4>
          <p className="text-gray-400">
            {info.detail.place_of_birth || "Not specified"}
          </p>
          <h4 className="text-gray-400 text-lg font-semibold mt-2">
            Also Known As
          </h4>
          <p className="text-gray-400">
            {info.detail.also_known_as.join(", ") || "Not specified"}
          </p>
        </div>
        {/* Personal Details Section */}
        <div className="w-[80%] flex flex-col gap-2 ml-[5%]">
          <h1 className="text-6xl font-black text-zinc-400">
            {info.detail.name}
          </h1>
          <h3 className="text-xl font-semibold text-zinc-400 mt-3">
            Biography
          </h3>
          <p className="text-gray-300 text-sm leading-5 tracking-wide">
            {info.detail.biography || "No biography available."}
          </p>

          <h3 className="text-xl font-semibold text-zinc-400 mt-3">
            Known For
          </h3>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between items-center ">
            <h3 className="text-xl font-semibold text-zinc-400 mt-3">Acting</h3>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div
            className="list-disc w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl border-2 
          border-zinc-700 shadow-[rgba(255,255,255,0.3)] p-5 text-zinc-400 "
          >
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white duration-300 cursor-pointer hover:bg-[#19191d] p-3
                rounded-lg "
              >
                <Link to={`/${category}/details/${c.id}`} className="">
                <span>{c.release_date && `- ${c.release_date.split("-")[0]} -` }</span>
                &nbsp; &nbsp;
                  <span>
                    {c.title || c.name || c.original_title || c.original_name}
                  </span>
                  <span className="block ml-5 mt-2">
                    {c.character && `Role: ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>

        {/* Horizontal Cards for Credits */}
      </div>
    </div>
  ) : (
    <Loader />
  );
}
