import { useHistory, useParams } from "react-router-dom"
import GenreForm from "./GenreForm";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlGenres } from "../endpoints";
import { genreCreationDTO} from "./genres.model";
import Loading from "../utils/Loading";
import DisplayErrors from "../utils/DisplayErrors";

export default function EditGenre(){
    const { id }:any =  useParams();
    const [genre , setGenre] = useState<genreCreationDTO>();
    const [errors , setErrors] = useState<string[]>([]);
    const history = useHistory();
    
    useEffect(()=>{
        axios.get(`${urlGenres}/${id}`)
        .then((response:AxiosResponse<genreCreationDTO>)=>{
            const data = response.data;
            setGenre(data)
        })
    },[id])

    const edit = async (genreToEdit: genreCreationDTO) =>{
        try{
            await axios.put(`${urlGenres}/${id}`, genreToEdit);
        }
        catch(error){
            if(axios.isAxiosError(error) && error.response){
                setErrors(error.response.data)
            }
        }
        
        console.log(`The Genre that have id : ${id} ,
            His name was changed to ${genreToEdit.name} complete`);
        history.push('/genres');
    }

    return(
        <>
            <h3>Edit Genre</h3>
            <DisplayErrors errors={errors} />
            {genre ? 
                <GenreForm 
                enableReinitialize={true}
                model={genre} 
                onSubmit={async value => {
                    const body =  {...value};
                    edit(body);
                }}/> : <Loading />}
             
        </>
    )
}