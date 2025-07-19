export { removeperson } from "../reducers/personSlice";
import axios from "../../utils/axios";
import { loadperson } from "../reducers/personSlice";

export const asyncloadperson = (personId) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${personId}`);
    const externalid = await axios.get(`/person/${personId}/external_ids`);
    const combinedCredits = await axios.get(`/person/${personId}/combined_credits`);
    const tvCredits = await axios.get(`/person/${personId}/tv_credits`);
    const movieCredits = await axios.get(`/person/${personId}/movie_credits`);

    let info = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits.data
    };
    dispatch(loadperson(info));
    // console.log(info);
  } catch (err) {
    console.error("Error:", err);
  }
};
