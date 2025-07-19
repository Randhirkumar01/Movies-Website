import { Link } from "react-router-dom";
import noImage from "/no-image.jpeg";

export default function Cards({ data, title }) {
  
  return (
    <div className="flex flex-wrap w-full h-full px-[10%] bg-[#1f1e24]">
      {data.map((card, index) => (
        <Link
          to={`/${card.media_type || title}/details/${card.id}`}
          className="relative w-[25vh] mr-[5%] mb-[5%] "
          key={index}
        >
          <img
            className="h-[40vh] object-cover rounded shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] "
            src={card.poster_path || card.backdrop_path || card.profile_path ? `https://image.tmdb.org/t/p/original/${
              card.poster_path || card.backdrop_path || card.profile_path
            }` : noImage}
            alt={card.title || card.name}
          />
          <h1 className="text-2xl text-zinc-300 mt-3 font-semibold">
            {card.original_title ||
              card.name ||
              card.title ||
              card.original_name}
          </h1>
          {card.vote_average >0 && (
            <div
              className="text-white w-[5vh] h-[5vh] rounded-full flex justify-center items-center
          bg-yellow-600 text-sm font-semibold absolute right-[-10%] bottom-[45%] "
            >
              {(card.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
