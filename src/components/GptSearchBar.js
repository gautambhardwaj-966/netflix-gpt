import React, { useRef } from 'react'
import lang from '../utils/languageConstants';
import { useSelector,useDispatch } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import addGptMovieResult from  "../utils/gptSlice";
const GptSearchBar = () => {
  //useDispatch is a hook that is coming from react-redux
const dispatch = useDispatch();
//syntax - store=>store.congig.(name in configSlice)  
const langKey = useSelector((store)=>store.config.lang);
const searchText = useRef(null);

//Search movie in TMDB 
const searchMovieTMDB = async (movie) => {
  const data = await fetch("https://api.themoviedb.org/3/search/movie?query"+ movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS
  );
  const json = await data.json();
  return json.results;
};

const handleGptSearchClick = async ()=>{
  //searchText.current.value will give us the searchText value
console.log(searchText.current.value);
//Will make call to GPT API and get movie results

const gptQuery = "Act as a movie recommendation system and suggest some movie for the Query :" + searchText.current.value + ". only give me names of 5 movies,comma separated like the example given ahead.Example Result: Gadar , Sholey , Don , Golmaal , Jawan";

const gptResults =  await openai.chat.completions.create({
  messages: [{ role: 'user', content: gptQuery }],
  model: 'gpt-3.5-turbo',
});
if(!gptResults.choices){
  //TODO: Write Error Handling}
}
console.log(gptResults.choices?.[0]?.message?.content);
//.split(",") will give array of movies
const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
//For each movie I will search TMDB API
const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));
//The result that we will get here is array of promises
//[Promise , Promise , Promise , Promise , Promise]

//We have to get result from all promise for that there is a function Promise.all()
//Promise.all() gives array of promises
//This will wait for all the promises to resolve then only we will get the data from tmdbResults 
const tmdbResults = await Promise.all(promiseArray);
console.log(tmdbResults);
dispatch(addGptMovieResult({movies:gptMovies, movieResults:tmdbResults}));

};

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      {/* (e)=>e.preventDefault will not refresh the page */}
      <form className="w-full md:w-1/2 bg-black grid grid-cols-12" 
      onSubmit={(e)=>e.preventDefault}>

        <input 
        ref={searchText}
        type="text" 
        className=" p-4 m-4 col-span-9" 

        //placeholder will appear in search space as instructions
        placeholder={lang[langKey].getSearchPlaceholder}/>

        <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg" onClick={handleGptSearchClick}>{lang[langKey].search}</button>
        {/* To make it dynamic we use lang[langKey].search instead of lang.langKey.search because we dont have  */}
      </form>
    </div>
  )
}

export default GptSearchBar;
