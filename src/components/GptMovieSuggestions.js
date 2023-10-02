import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptMovieSuggestions = () => {
//subscribing to store
  const gpt = useSelector((store)=>store.gpt);

//extracting movieResults and movieNames
  const{movieResults , movieNames} = gpt;
//We can write the above lines as follows also :- const{movieResults , movieNames} = useSelector((store)=>store.gpt); directly

//We are doing error handling here if movieNames are not there then return null
if(!movieNames) return null;

  return (
   
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
       <div>
        {/* im map function we have second parameter as index */}
        {movieNames.map((movieName,index) =>(<MovieList
         key={movieNames} 
         title={movieNames} 
         movies = {movieResults[index]}
         />)
         )
         }
      
    </div>
    </div>
  )
}

export default GptMovieSuggestions;
