import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './components/Search'


const MyCard = ({ actors }) => {
  return (
    <div className="samerOne" style={{color: 'yellow', padding: '20px'}}>
      {actors.map((actor, index) => (
        <h2 key={index}> {actor.name} ({actor.age})</h2>
      ))}
      <br />
    </div>
  )
}

const MyMovie = ({title}) => {

  const [hasLiked, sethasLiked] = useState(false);
  const [count, setcount] = useState(0);

  useEffect( () => {
    console.log(`the '${title}' movie situation '${hasLiked}'`);
  }, [hasLiked] );

  return(
    <div className="samerTwo" onClick={() => setcount((count) => count+1)}>
    <h2>{title} {count || null}</h2>
    <button onClick={() => sethasLiked(!hasLiked)}>Situation : {hasLiked ? 'Liked' : 'Like'}</button>
  </div>
  ) 
}

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


const App = () => {

  const [searchTerm, setsearchTerm] = useState('');
  return( 
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="banner" />
          <h1>Find your favourite <span className="text-gradient">Movies</span></h1>
        </header>
        <Search mySearch = {searchTerm}  mySearchResult = {setsearchTerm} />
        <h1 className="text-white">{searchTerm}</h1>
        </div>
    </main>
     
     
  )
}

export default App


