import { useEffect, useState } from "react";
import MoviesList from "./MoviesList";
import { landingPageDTO } from './movies.model'
import { inTheaters, upcomingReleases } from './DataMovies'

export default function LandingPage() {
    const [movies, setMovies] = useState<landingPageDTO>({});

    useEffect(() => {
        const timeId = setTimeout(() => {

            setMovies({
                inTheaters: inTheaters,
                upcomingReleases: upcomingReleases,
            });

        }, 1000);

        return () => {
            clearTimeout(timeId);
        }
    });
    
    return (
        <>
            <h3>In Theaters</h3>
            <MoviesList movies={movies.inTheaters} />

            <h3>Upcoming Releases</h3>
            <MoviesList movies={movies.upcomingReleases} />
        </>
    )
}