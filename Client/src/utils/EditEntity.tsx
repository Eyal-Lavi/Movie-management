import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";

export default function EditEntity<TCreation , TRead>
        (props: editEntityProps<TCreation , TRead>){

    const { id }:any =  useParams();
    const [entity , setEntity] = useState<TCreation>();
    const [errors , setErrors] = useState<string[]>([]);
    const history = useHistory();
    
    useEffect(()=>{
        axios.get(`${props.url}/${id}`) // מושך פה את הישות לצורה של TRead
        .then((response:AxiosResponse<TRead>)=>{
            const entityData = response.data;
            setEntity(props.transform(entityData));// ממיר את הישות ל TCreation
        })
    },[id]) // רק במידה ו id משתנה

    const edit = async (entityToEdit: TCreation) =>{
        try{
            if(props.transformFormData){
                const formData = props.transformFormData(entityToEdit);
                await axios({
                    method:'put',
                    url:`${props.url}/${id}`,
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'}
                })
            } else{
                await axios.put(`${props.url}/${id}`, entityToEdit);
            }
        }
        catch(error){
            if(axios.isAxiosError(error) && error.response){
                setErrors(error.response.data)
            }
        }
        history.push(props.indexURL);
    }

    return(
        <>
            <h3>Edit {props.entityName}</h3>
            <DisplayErrors errors={errors} />
            {entity ? props.children(entity , edit) : <Loading />}  {/* שליחת הפונקציה והישות למי שמכיל את הקומפוננטה הזאת - עריכת ישות */}
        </>
    )
}

interface editEntityProps<TCreation , TRead >{
    entityName: string;
    url: string;
    indexURL: string;
    transform(entity: TRead): TCreation;
    transformFormData?(model: TCreation): FormData;
    children(
                entity: TCreation,
                edit: (entity: TCreation)=> void
            ) : ReactElement;
}

EditEntity.defaultProps = {
    transform: (entity: any) => entity ,
}