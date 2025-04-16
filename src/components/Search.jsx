import React from 'react';

const Search = ({mySearch, mySearchResult}) => {
    return(
    //<div className="text-white text-3xl">{mySearch}</div>
    <div className="search">
        <div>
            <img src="./search.svg" alt="search movies"/>
            <input 
            type="text" 
            placeholder="search here"
            value={mySearch}
            onChange={(e) => mySearchResult(e.target.value)}
            />
        </div>
    </div>
    )
}

export default Search