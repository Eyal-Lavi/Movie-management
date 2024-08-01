import { urlActors } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { actorDTO } from "./actors.model";

export default function IndexActors(){
    return(<>
        <IndexEntity<actorDTO>
            url={urlActors}
            createUrl='actors/create'
            entityName="Actor"
            title="Actors"
        >
            {(actors,buttons)=> <>
                <thead>
                    <tr>
                        <td></td>
                        <td>Name</td>
                    </tr>
                </thead>
                <tbody>
                    {actors?.map(actor => 
                        <tr key={actor.id}>
                            <td>
                                {buttons(`actors/edit/${actor.id}`,actor.id)}
                            </td>
                            <td>{actor.name}</td>
                        </tr>
                    )}
                </tbody>
            </>}
        </IndexEntity>
    </>)
}