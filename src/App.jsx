import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './components/Search'
import Loader from './components/Loader'

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
  

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint,API_OPTIONS);

      if(!response.ok){
        throw new Error('not ok');
      }
        const data = await response.json();
        console.log(data);
        setMovieList(data.results || []);
  
    } catch (error) {
      console.error(`Error Fetching movies : ${error}`);
      setErrorMessage('Error occurred, try again later')
    } finally {
      setIsLoading(false);
    }
  }

  useEffect( () => {
    fetchMovies();
  }, [] );

  return( 
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="banner" />
          <h1>Find your favourite <span className="text-gradient">Movies !</span></h1>
          <Search mySearch = {searchTerm}  mySearchResult = {setSearchTerm} />
          <h1 className="text-white">{searchTerm}</h1>
        </header>
        
        <section className="all-movies">
    <h2 className='mt-10'>All movies</h2>
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
          <p key={movie.id} className='text-white'>
            {movie.title}
          </p>
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


