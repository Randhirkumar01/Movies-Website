export { removemovie } from "../reducers/movieSlice";
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";

export const asyncloadmovie = (movieId) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${movieId}`);
    const externalid = await axios.get(`/movie/${movieId}/external_ids`);
    const recommendations = await axios.get(
      `/movie/${movieId}/recommendations`
    );
    const similar = await axios.get(`/movie/${movieId}/similar`);
    const translations = await axios.get(`/movie/${movieId}/translations`);
    const videos = await axios.get(`/movie/${movieId}/videos`);
    const watchprovider = await axios.get(`/movie/${movieId}/watch/providers`);

    let info = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map((t) => t.english_name),
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchprovider: watchprovider.data.results.IN
    };
    dispatch(loadmovie(info));
    // console.log(info);
  } catch (err) {
    console.error("Error:", err);
  }
};
