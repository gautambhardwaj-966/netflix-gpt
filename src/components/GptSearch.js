import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_URL } from '../utils/constants';

const GptSearch = () => {
  return (
    <>
    <div>
      {/* n Tailwind CSS, the fixed class is used to apply the CSS property position: fixed; to an element. The fixed position is a type of CSS positioning that makes the element stay in a fixed position relative to the viewport, regardless of scrolling. */}

      {/* -z-10 Class: The -z-10 class is setting the element's z-index to -10. The z-index property controls the stacking order of elements on a web page. Elements with a higher z-index value will appear on top of elements with a lower value. By setting it to -10, this element will be positioned behind other elements on the page.
       */}
       
      <div className="fixed -z-10">
      <img src={BG_URL} alt="logo"/>
      </div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
    </>
  )
}

export default GptSearch;
