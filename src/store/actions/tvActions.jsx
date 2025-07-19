export { removetv } from "../reducers/tvSlice";
import axios from "../../utils/axios";
import { loadtv } from "../reducers/tvSlice";

export const asyncloadtv = (tvId) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${tvId}`);
    const externalid = await axios.get(`/tv/${tvId}/external_ids`);
    const recommendations = await axios.get(
      `/tv/${tvId}/recommendations`
    );
    const similar = await axios.get(`/tv/${tvId}/similar`);
    const translations = await axios.get(`/tv/${tvId}/translations`);
    const videos = await axios.get(`/tv/${tvId}/videos`);
    const watchprovider = await axios.get(`/tv/${tvId}/watch/providers`);

    let info = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map((t) => t.english_name),
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchprovider: watchprovider.data.results.IN
    };
    dispatch(loadtv(info));
    // console.log(info);
  } catch (err) {
    console.error("Error:", err);
  }
};
