import { urlMovieTheaters } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { movieTheaterCreationDTO, movieTheaterDTO } from "./movieTheater.model";
import MovieTheaterForm from "./MovieTheaterForm";

export default function EditMovieTheater(){
    return(
        <>
            <EditEntity<movieTheaterCreationDTO,movieTheaterDTO>
                url={urlMovieTheaters}
                entityName="Movie Theater"
                indexURL="/movietheaters"
            >
                {(entity , edit) => 
                    <MovieTheaterForm model={entity}
                        onSubmit={async values => {
                            console.log(values);
                            await edit(values);
                    }}/>
                }
            </EditEntity>
        </>
    )
}