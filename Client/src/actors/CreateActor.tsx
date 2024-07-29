import { useState } from "react";
import ActorForm from "./ActorForm";
import axios, { isAxiosError } from "axios";
import { urlActors } from "../endpoints";
import { actorCreationDTO } from "./actors.model";
import { convertActorToFormData } from "../utils/formDataUtils";
import { useHistory } from "react-router-dom";
import DisplayErrors from "../utils/DisplayErrors";

export default function CreateActor(){
    const [errors , setErrors] = useState<string[]>([]);
    const history = useHistory();

    const create = async (actor : actorCreationDTO) => {
        try{
            const fromData = convertActorToFormData(actor);
            await axios(
                {
                    method: 'post',
                    url: urlActors,
                    data: fromData,
                    headers: {'Content-Type': 'multipart/form-data'}
                }
            )

            history.push('/actors')
        }
        catch(error){
            if(isAxiosError(error) && error.response){
                setErrors(error.response.data);
            }
        }
    }


    return(<>
        <h1>Create Actor</h1>
        {errors ?? <DisplayErrors errors={errors}/>}
        <ActorForm 
            model={{
                name:'',
                DateOfBirth: undefined,
            }} 
            onSubmit={async (values)=> {await create(values)}
            }/>
    </>)
}