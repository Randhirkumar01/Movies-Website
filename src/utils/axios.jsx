import axios from "axios";

const Instance = axios.create({
  // https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/trending/all/day
  // baseURL: "https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3",
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODMyMjI4Njg5YmZlZDA3YzQ2M2UzMTA0ZDk3MzIxOCIsIm5iZiI6MTc1MDc4NTM2Ni43NDQsInN1YiI6IjY4NWFkZDU2YTA1N2MzMmRlOGZlZmFjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V7MhlTkrZrOqHppOSotfhq8djYArom_jICkXx2ypV8c"
  }
});

export default Instance;
