import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = ()=>{
    //Fetch data from TMDB API and update store
const dispatch = useDispatch();

//Memoization
const nowPlayingMovies = useSelector(store=>store.movies.nowPlayingMovies);

const getNowPlayMovies = async ()=> {
  const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS);
  const json = await data.json();
  console.log(json);
  dispatch(addNowPlayingMovies(json.results));

};
useEffect(()=>{
 //Memoization 
if(!nowPlayingMovies) getNowPlayMovies();
},[]);
};

export default useNowPlayingMovies;