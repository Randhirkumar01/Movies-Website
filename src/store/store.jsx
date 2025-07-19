import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieSlice";
import tvReducer from "./reducers/tvSlice";
import personReducer from "./reducers/personSlice";

export const store = configureStore({
  reducer: {
    // Define your reducers here
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer
  }
});

export default store

