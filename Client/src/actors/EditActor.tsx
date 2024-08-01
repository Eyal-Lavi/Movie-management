import ActorForm from "./ActorForm";
import EditEntity from "../utils/EditEntity";
import { actorCreationDTO, actorDTO } from "./actors.model";
import { urlActors } from "../endpoints";
import { convertActorToFormData } from "../utils/formDataUtils";

export default function EditActor(){

    function transform(actor: actorDTO): actorCreationDTO{
        return(
            {
                name: actor.name,
                pictureURL: actor.picture,
                biography: actor.biography,
                dateOfBirth: new Date(actor.dateOfBirth),
            }
        )
    }
    return(<>
        <EditEntity<actorCreationDTO,actorDTO>
            url={urlActors}
            entityName="Actor"
            indexURL={`/actors`}
            transformFormData={convertActorToFormData}
            transform={transform}
        >
            {(entity, edit)=>
            <ActorForm 
                model={entity}
                onSubmit={async values => await edit(values)}

            />}
        </EditEntity>

    </>)
}