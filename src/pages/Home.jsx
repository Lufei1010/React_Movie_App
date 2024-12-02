import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react"
import { searchMovies, getPopularMovies } from "../api/api"
import '../css/Home.css'
function Home() {
  const [searchQuery, setSearchQuery] = useState(""); //
  //api
  const [movies, setMovies] = useState([]); // updates movie list if there is new movies
  const [isLoading, setIsLoading] = useState(true);

  // const movies = getPopularMovies() It will fetch the movies every single time
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error("Error searching for movies:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPopularMovies();
  }, []); // [] runs only once
  

  const handleSearch = async (e) => {
    e.preventDefault();
    //alert(searchQuery);
    if (!searchQuery.trim())
    if (isLoading) return
    
    setIsLoading(true)
    try{
      const searchedMovies = await searchMovies(searchQuery);
      setMovies(searchedMovies);
      console.log(searchedMovies) 

    } catch (err) {
      console.error("Error searching for movies:", err);
    } finally {
      setIsLoading(false)
    }  
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="search for movies..."
          className="search-input"
          value={searchQuery} //
          onChange={(e) => setSearchQuery(e.target.value)} //
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
  export default Home

