import { useHistory, useParams } from "react-router-dom"
import GenreForm from "./GenreForm";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlGenres } from "../endpoints";
import { genreDTO } from "./genres.model";

export default function EditGenre(){
    const { id }:any =  useParams();
    const [name , setName] = useState<string>('');
    const history = useHistory();

    useEffect(()=>{
        axios.get(`${urlGenres}/${id}`)
        .then((response:AxiosResponse<genreDTO>)=>{
            const data = response.data;
            setName(data.name);
            console.log(data);
        })
    },[])

    const handleSave = (value: {name: string , id: number}) =>{
        axios.put(`${urlGenres}`, value)
        .then(()=>{
            console.log("ok");
            history.push('/genres');
        });
    }
    return(
        <>
            <h3>Edit Genre</h3>
            <GenreForm 
                enableReinitialize={true}
                model={{name:`${name}`}} 
                onSubmit={async value => {
                    const body =  {...value , id};
                    handleSave(body);
                }}/> 
        </>
    )
}