import { useState, useEffect, use } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './components/Search'
import Loader from './components/Loader'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'
import { updateSearchCount, getTrendingMovies } from './Appwrite'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method : 'GET',
  headers : {
  accept : 'application/json',
  Authorization : `Bearer ${API_KEY}`
 }
};

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

  //debounce the search term to 'prevent' too many API request by waiting for the user to stop typing for 500 milliseconds
  useDebounce( () => setDebouncedSearchTerm(searchTerm), 1200, [searchTerm]); 
  

  const fetchMovies = async (query = '') => {
      setIsLoading(true);
      setErrorMessage('');
    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${ encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint,API_OPTIONS);

      if(!response.ok){
        throw new Error('not ok');
      }
        const data = await response.json();
        setMovieList(data.results || []);

        if(query && data.results.length > 0){
          await updateSearchCount(query, data.results[0]);
        }
      
    } catch (error) {
      console.error(`Error Fetching movies : ${error}`);
      setErrorMessage('Error occurred, try again later')
    } finally {
      setIsLoading(false);
    }
  }


  const loadTrendingMovies = async() => {
    try {
     const trendMovies = await getTrendingMovies();
    console.log(trendMovies);
    setTrendingMovies(trendMovies);
  
    } catch (error) {
      console.log(`the error is : ${error}`)
    }
  }

  useEffect( () => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm] );

 // we use '[]' so that our function will call only at start
  useEffect(() => {
    loadTrendingMovies();
  },[]);

  return( 
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src="hero.png" alt="banner" />
          <h1>Find your favourite <span className="text-gradient">Movies !</span></h1>
          <Search mySearch = {searchTerm}  mySearchResult = {setSearchTerm} />
        </header>
      
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2 className='text-white'>Trending Movies</h2>
          <ul>
           {
            trendingMovies.map( (movie, index) => (
              <li key={movie.$id}>
                <p>{index+1}</p>
                <img src={movie.poster_url} alt={movie.title} />
                </li>
            ))
           }
          </ul>
          </section>
        )}
        
        <section className="all-movies">
    <h2 >All movies</h2>
    {errorMessage && <p className="text-red-400">{errorMessage}</p>}

    {
      isLoading ? 
      //(<p className="text-white">Loading....</p>)
      <Loader />
       : errorMessage ? 
      (<p className="text-red-400">Error occurred</p>)
       : 
      (<ul>
        {movieList.map( (movie) => (
          <MovieCard key={movie.id} myMovie ={movie} />
        ) )}
      </ul>)
    }
        </section>
        </div>
    </main>   
  )
}

// const MyCard = ({ actors }) => {
//   return (
//     <div className="samerOne" style={{color: 'yellow', padding: '20px'}}>
//       {actors.map((actor, index) => (
//         <h2 key={index}> {actor.name} ({actor.age})</h2>
//       ))}
//       <br />
//     </div>
//   )
// }

// const MyMovie = ({title}) => {

//   const [hasLiked, sethasLiked] = useState(false);
//   const [count, setcount] = useState(0);

//   useEffect( () => {
//     console.log(`the '${title}' movie situation '${hasLiked}'`);
//   }, [hasLiked] );

//   return(
//     <div className="samerTwo" onClick={() => setcount((count) => count+1)}>
//     <h2>{title} {count || null}</h2>
//     <button onClick={() => sethasLiked(!hasLiked)}>Situation : {hasLiked ? 'Liked' : 'Like'}</button>
//   </div>
//   ) 
// }


// const App = () => {
//   return(
//     <div>
//        <MyCard actors={[
//         { name: 'Keanu Reeves', age: 45 },
//         { name: 'Chris Evans', age: 40 },
//         {name : 'Robert Downey Jr.', age: 55}
//         ]} />
//       <h1>My movies</h1>
//       <MyMovie title ="Man of Steel" />
//       <MyMovie title ="Iron Man" />
//       <MyMovie title ="Boss Baby" />

//       <h1 class="text-3xl font-bold underline">
//         Hello world!
//       </h1>
//     </div>

//   )
// }

export default App


