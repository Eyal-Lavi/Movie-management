import { useEffect, useState } from "react";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movieTheaters/movieTheater.model";
import MovieForm from "./MovieForm";
import axios, { AxiosResponse } from "axios";
import { urlMovies } from "../endpoints";
import { moviesPostGetDTO } from "./movies.model";
import Loading from "../utils/Loading";

export default function CreateMovie(){
    const [nonSelectedGenres , setNonSelectedGenres] = useState<genreDTO[]>([])
    const [nonSelectedMovieTheaters , setNonSelectedMovieTheaters] = useState<movieTheaterDTO[]>([])
    const [loading , setLoading] = useState(true);

    useEffect(()=>{
        axios.get(`${urlMovies}/postget`)
            .then((response: AxiosResponse<moviesPostGetDTO>)=>{
                setNonSelectedGenres(response.data.genres)
                setNonSelectedMovieTheaters(response.data.movieTheaters);
                console.log("response.data.genres");
                console.log(response.data.genres);
                console.log("response.data.movieTheaters");
                console.log(response.data.movieTheaters);
                
                setLoading(false);
            })
    },[]);

    return(
        <>
            <h3>Create Movie</h3>
            {loading ? <Loading /> :
                <MovieForm onSubmit={async values => {
                        await new Promise((reject, resolve) => setTimeout(reject , 3000));
                        console.log(values);
                    }}
                    model={{title:'', inTheaters:false , trailer:''}}
                    selectedGenres={[]}
                    nonSelectedGenres={nonSelectedGenres}
                    nonSelectedMovieTheaters={nonSelectedMovieTheaters}
                    selectedMovieTheaters={[]}
                    selectedActors={[]}
                />}
        </>
    )
}