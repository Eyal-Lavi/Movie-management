import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movieTheaters/movieTheater.model";
import MovieForm from "./MovieForm";

export default function CreateMovie(){

    const nonSelectedGenres: genreDTO[] = [{id:1 , name:'Comedy'} , {id:2 , name: 'Drama'}, {id:3 , name: 'Action'}]
    const nonSelectedMovieTheaters: movieTheaterDTO[] =
        [{id:1 , name:'Sambil'} ,{id:2 , name: 'Agora'}]

    return(
        <>
            <h3>Create Movie</h3>
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
            />
        </>
    )
}