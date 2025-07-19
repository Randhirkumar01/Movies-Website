import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import Loader from "./templates/Loading";
import HorizontalCards from "./templates/HorizontalCards";

export default function MovieDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  // console.log(info);

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie()); // Clean up the effect
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),
        url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
      className="relative w-full h-[140vh] px-[10%] text-white "
    >
      {/* Part 1 Navbar */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl ">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556cd] ri-arrow-left-line"
        ></Link>

        <a target="_blank" href={info.detail.homepage}>
          <i className="hover:text-[#6556cd] ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="hover:text-[#6556cd] ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https:www.imdb.com/title/${info.externalid.imdb_id}`}
          className="hover:text-[#6556cd] uppercase"
        >
          imdb
        </a>
      </nav>

      {/* Part 2 Poster and Details */}
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-center">
          <img
            className=" mt-2 h-[50vh] object-cover rounded shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] "
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt={info.detail.title || info.detail.name}
          />
          {/* Movie Content */}
          <div className="flex flex-col gap-[0.3vmax] ml-[5%] my-auto w-[70%]">
            <h1 className="text-4xl text-white font-black">
              {info.detail.title ||
                info.detail.name ||
                info.detail.original_name ||
                info.detail.original_title}

              <small className="text-lg font-bold text-zinc-200">
                &nbsp; ({info.detail.release_date.split("-")[0]})
              </small>
            </h1>
            <h3 className="text-white font-bold flex items-center gap-x-[5vmax]">
              {info.detail.release_date && (
                <span>
                  <i className="ri-calendar-line text-[#E8D40C] mr-2"></i>
                  {info.detail.release_date}
                </span>
              )}
              {info.detail.vote_average && (
                <span>
                  <i className="ri-star-line text-[#E8D40C] mr-2"></i>
                  {info.detail.vote_average} / 10
                </span>
              )}
              {info.detail.runtime && (
                <span>
                  <i className="ri-time-line text-[#E8D40C] mr-2"></i>
                  {info.detail.runtime} Min
                </span>
              )}
            </h3>
            <div className="flex gap-x-1">
              <span className="text-md text-zinc-200 font-semibold">
                {info.detail.genres?.map((g) => g.name).join(", ")}
              </span>
            </div>

            <div className="flex gap-x-1">
              <span className="text-sm text-zinc-200 font-semibold tarcking-tight leading-none">
                {info.translations.join(", ")}
              </span>
            </div>

            <p className="text-lg text-zinc-200 font-semibold tracking-tight">
              Tagline: &nbsp; {info.detail.tagline}
            </p>

            <p className="text-sm text-zinc-200 font-semibold tracking-tight leading-4">
              Storyline: &nbsp;
              {info.detail.overview || ""}
            </p>

            <Link
              to={`${pathname}/trailer`}
              className="mt-3 px-6 py-2 bg-[#6556cd] w-fit rounded-lg text-white ml-16"
            >
              <i className="ri-play-fill mr-2"></i>
              Play Trailer
            </Link>
          </div>
        </div>
        <div className="w-[80%] flex gap-25 mt-5">
          {info.watchprovider && info.watchprovider.flatrate && (
            <div className="flex gap-x-5 items-center text-white">
              <h1>Available on Platforms :</h1>
              {info.watchprovider.flatrate.map((w) => (
                <img
                  key={w.provider_id}
                  title={w.provider_name}
                  className="w-[7vh] h-[7vh] object-cover rounded"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt={w.provider_name}
                />
              ))}
            </div>
          )}

          {info.watchprovider && info.watchprovider.rent && (
            <div className="flex gap-x-5 items-center text-white">
              <h1>Available on Rent :</h1>
              {info.watchprovider.rent.map((w) => (
                <img
                  key={w.provider_id}
                  title={w.provider_name}
                  className="w-[7vh] h-[7vh] object-cover rounded"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt={w.provider_name}
                />
              ))}
            </div>
          )}

          {info.watchprovider && info.watchprovider.buy && (
            <div className="flex gap-x-5 items-center text-white">
              <h1>Available to Buy :</h1>
              {info.watchprovider.buy.map((w) => (
                <img
                  key={w.provider_id}
                  title={w.provider_name}
                  className="w-[7vh] h-[7vh] object-cover rounded"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt={w.provider_name}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Part 3 Recommendations and Similar Stuff */}
      <hr className="border-1 border-zinc-400 mt-5 mb-2" />
      <h2 className="text-3xl text-white font-semibold ">
        Recommendations & Similar
      </h2>
        <HorizontalCards
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
        <Outlet />
    </div>
  ) : (
    <Loader />
  );
}
