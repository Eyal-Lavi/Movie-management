import GenericList from "../utils/GenericList";
import IndividualMovie from "./IndividualMovie"
import css from './MoviesList.module.css'
import { movieDTO } from "./movies.model";

export default function MoviesList(props: moviesListProps) {
    return (
        <GenericList list={props.movies} >
            <div className={css.div}>
                {props.movies?.map(movie =>
                    <IndividualMovie {...movie} key={movie.id} />)}
            </div>
        </GenericList>
    )
}

export interface moviesListProps{
    movies?: movieDTO[];
}