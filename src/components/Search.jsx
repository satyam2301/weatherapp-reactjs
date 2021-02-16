import React from "react";
import * as FaIcons from 'react-icons/fa'

function Search({onChange, value, search}) {

  return (
    <>
      
              <div className="search-box">
                <input
                  type="text"
                  className="search-bar"
                  placeholder="Search ... "
                  onChange={onChange}
                  value={value}
                  onKeyPress={search}
                  
                />
                <button className='fa-search' onClick={search} ><FaIcons.FaSearch /></button>
              </div>
              
    </>
  );
}

export default Search;
