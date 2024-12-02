import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

// children is a reserved prop. it is anything inside of the component that rendered.
export const MovieProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // local storage
useEffect(() => {
  const storedFavs = localStorage.getItem("favourites");

  if (storedFavs) setFavourites(JSON.parse(storedFavs)); 
}, []);


  //when updates
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (movie) => {
    // similar to favourites.push() but it can not be used in state, updating a array with state should be:
    setFavourites((prev) => [...prev, movie]);
  };

  const removeFromFavourites = (movieId) => {
    setFavourites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavourite = (movieId) =>
    favourites.some((movie) => movie.id === movieId);

  const value = {
    favourites,
    addToFavourites,
    removeFromFavourites,
    isFavourite,
  };

  return (
    <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
  );
};
