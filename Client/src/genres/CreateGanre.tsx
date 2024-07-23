import axios, { AxiosResponse } from "axios";
import GenreForm from "./GenreForm";
import { genreCreationDTO, genreDTO } from "./genres.model";
import { urlGenres } from "../endpoints";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";

export default function CreateGenre() {
    const history = useHistory();
    const [errors , setErrors] = useState<string[]>([]);
    async function create(genre: genreCreationDTO) {
        try{
            await axios.post(urlGenres , genre);
            history.push("/genres")
        }
        catch(error: any){
            console.error(error);
            if(error && error.response){
                setErrors(error.response.data);
            }
        }
    }
    return (
        <>
            <h3>Create Genre</h3>
            <DisplayErrors errors={errors}/>
            <GenreForm 
                model={{name:''}} 
                onSubmit={async value => {
                    await create(value);
                }}/> 
        </>
    )
}
