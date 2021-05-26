import React, { useState, useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('money heist');
   
      const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=b38683c8`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
          setMovies(responseJson.Search);
        }
        
      };

      useEffect(() => {
        getMovieRequest(searchValue);
      }, [searchValue]);

      useEffect(() => {
         const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'));
         setFavourites(movieFavourites);
      }, []);

      const saveLocalStorage = (items) => {
         localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
      }

      const addFavouriteMovie = (movie) => {
         const newFavouriteList = [...favourites, movie];
         setFavourites(newFavouriteList);
         saveLocalStorage(newFavouriteList);
      }

      const removeFavMovie = (movie) => {
          const newFavouriteList = favourites.filter(
            (favourite) => favourite.imdbID !== movie.imdbID);

          setFavourites(newFavouriteList);
          saveLocalStorage(newFavouriteList);
      }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='flex'>
        <MovieList
         handleFavouritesClick={addFavouriteMovie}
         movies={movies} 
         favouriteComponent={AddFavourites} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='flex'>
        <MovieList
         handleFavouritesClick={removeFavMovie}
         movies={favourites} 
         favouriteComponent={RemoveFavourites} />
      </div>
    </div>
  );
}

export default App