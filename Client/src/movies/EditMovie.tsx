import { actorMovieDTO } from "../actors/actors.model";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movieTheaters/movieTheater.model";
import MovieForm from "./MovieForm";

export default function EditMovie() {

    const nonSelectedGenres: genreDTO[] = [{ id: 1, name: 'Comedy' }];
    const selectedGenres: genreDTO[] = [{ id: 2, name: 'Drama' }];


    const nonSelectedMovieTheaters: movieTheaterDTO[] =
        [{ id: 2, name: 'Agora' }];

    const selectedMovieTheaters: movieTheaterDTO[] =
        [{ id: 1, name: 'Sambil' }];

    const selectedActors: actorMovieDTO[] = 
        [
            {id:1 , name: 'Felipe', character:'Geralt', picture:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/330px-Tom_Holland_by_Gage_Skidmore.jpg'},
        ]
        
    return (
        <>
            <h3>Edit movie</h3>
            <MovieForm onSubmit={async values => {
                await new Promise((reject, resolve) => setTimeout(reject, 3000));
                console.log(values);
            }}
                model={{
                    title: 'Toy Story',
                    inTheaters: true,
                    trailer: 'url-youtube',
                    releaseDate: new Date('2019-12-30T00:00:00')
                }}
                selectedGenres={selectedGenres}
                nonSelectedGenres={nonSelectedGenres}
                selectedMovieTheaters={selectedMovieTheaters}
                nonSelectedMovieTheaters={nonSelectedMovieTheaters}  
                selectedActors={selectedActors}
            />
        </>
    )
}