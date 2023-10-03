import React from 'react'
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
    const movies = useSelector(store=>store.movies);

    //render this component only when movie is there
  return (
  movies.nowPlayingMovies && (
    //if we need to take our container little bit up we give -margin top ,i.e -mt

    //We can bring ahead Secondary container by using z-index and for using z-index there should be position property set and hence we have used relative z-20

    //If we give here as margin top , it will all move to the top hence we have created a separate div and gave margin top there.
    
    <div className="bg-black">
        <div className="mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20">
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Trending"} movies={movies.nowPlayingMovies}/>
        {/* our store.movie will also have popular movies now */}
      <MovieList title={"Popular"} movies={movies.popularMovies}/>
      <MovieList title={"Upcoming Movies"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Horror"} movies={movies.nowPlayingMovies}/>
      </div>
    </div>
  )
  );
};

export default SecondaryContainer;
