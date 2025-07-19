import { Link } from "react-router-dom";
import noImage from "/no-image.jpeg";

export default function HorizontalCards({ data }) {
  return (
    <div className="w-[100%] flex gap-5 overflow-y-hidden p-5 ">
      {data.length > 0 ? (
        data.map((item, index) => (
          <Link
            to={`/${item.media_type !== "tv" ? "movie" : "tv"}/details/${
              item.id
            }`}
            key={index}
            className="min-w-[18%] h-[40vh] bg-zinc-900 rounded-lg shadow-lg hover:scale-105
          transition-transform duration-300"
          >
            <img
              className="w-full h-[50%] object-cover rounded-lg"
              src={
                item.backdrop_path || item.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      item.backdrop_path || item.poster_path
                    }`
                  : noImage
              }
              alt={item.title || item.name}
            />
            <div className="text-white p-3 h-[50%] flex flex-col gap-4 overflow-y-auto">
              <h1 className="text-lg font-semibold tracking-tight leading-5">
                {item.original_title ||
                  item.name ||
                  item.title ||
                  item.original_name}
              </h1>
              <p className="text-sm text-zinc-300 tracking-tight leading-none">
                {item.overview.slice(0, 40)}...
                <span className="text-blue-500">Read more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-white font-black text-3xl text-center mt-5">
          No movies found
        </h1>
      )}
    </div>
  );
}
