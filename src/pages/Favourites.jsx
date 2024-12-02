import '../css/Favourites.css'
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
function Favourites() {
    const { favourites } = useMovieContext();

    if (favourites) {
        return <div className="favourites">
            <h2>Favourite Movies</h2>
            {favourites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    }
    return <div className="favourite-empty">
        <h2>No Favourite Movies Yet</h2>
    </div>
}

export default Favourites;