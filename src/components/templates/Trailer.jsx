import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Notfound from "./Notfound";

export default function Trailer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <div
      className="absolute h-screen w-full top-0 left-0 flex items-center justify-center 
  z-[100] bg-[rgba(0,0,0,0.8)] "
    >
      <Link
        onClick={() => navigate(-1)}
        className="absolute top-5 right-5 hover:text-[#6556cd] text-5xl ri-close-circle-line"
      ></Link>
      {ytvideo ? (
        <ReactPlayer
          height={460}
          width={900}
          controls={true}
          playing={true}
          muted={true}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      ) : (
        <Notfound />
      )}
    </div>
  );
}
