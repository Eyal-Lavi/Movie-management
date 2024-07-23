import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { genreDTO } from "./genres.model";
import { urlGenres } from "../endpoints";
import GenericList from "../utils/GenericList";
import Button from "../utils/Button";

export default function IndexGenres(){
    const [genres , setGenres] = useState<genreDTO[]>();

    useEffect(()=>{
        axios.get(urlGenres)
            .then((response: AxiosResponse<genreDTO[]>) => {
                setGenres(response.data);
            })
    },[]);
    const handleDelete=(id:number)=>{
        axios.delete(urlGenres , {
            headers:{
                'Id':id,
            }
        })
            .then(()=>{
                console.log("ok delete");
            })
    }
    return(
        <>
            <h3>Genres</h3>
            <Link className="btn btn-primary" to='/genres/create'>Create genre</Link>
            <GenericList list={genres}>
                <table className="table table-striped">
                    <thead>
                        <th></th>
                        <th>Name</th>
                    </thead>
                    <tbody>
                        {genres?.map(genre => 
                            <tr key={genre.id}>
                                <td>
                                    <Link className="btn btn-success"
                                     to={`/genres/edit/${genre.id}`}>Edit</Link>
                                    <Button className="btn btn-danger" onClick={()=> handleDelete(genre.id)}>Delete</Button>
                                </td>
                                <td>{genre.name}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </GenericList>
        </>
    )
}0