import IndexEntity from "../utils/IndexEntity";
import { movieTheaterDTO } from "./movieTheater.model";
import { urlMovieTheaters } from "../endpoints";

export default function IndexMovieTheaters(){
    return(
        <IndexEntity<movieTheaterDTO>
            url={urlMovieTheaters}
            createUrl={"movietheaters/create"}
            title="Movie Theaters"
            entityName="Movie Theater"
        >
            {(entities,buttons)=>(<>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {entities?.map(entity => (
                        <tr key={entity.id}>
                            <td>
                                {buttons(`movietheaters/edit/${entity.id}`,entity.id)}
                            </td>
                            <td>
                                {entity.name}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </>)}                    
        </IndexEntity>
    )
}