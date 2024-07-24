import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { genreDTO } from "./genres.model";
import { urlGenres } from "../endpoints";
import GenericList from "../utils/GenericList";
import Button from "../utils/Button";
import Pagination from "../utils/Pagination";
import RecordsPerPageSelect from "../utils/RecordsPerPageSelect";

export default function IndexGenres(){
    const [genres , setGenres] = useState<genreDTO[]>();
    const [totalAmountOfPages , setTotalAmountOfPages] = useState(0); // סכום העמודים הכולל
    const [recordsPerPage , setRecordsPerPage] = useState(5); // כמות עמודות בדף
    const [page , setPage] = useState(1); // העמוד הנוכחי

    useEffect(()=>{
        axios.get(urlGenres , {
            params: {page , recordsPerPage}
        })
            .then((response: AxiosResponse<genreDTO[]>) => {
                const totalAmountOfRecords = parseInt(response.headers['totalamountofrecords'], 10);
                setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage))
                setGenres(response.data);
            })
    },[page , recordsPerPage]);

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

            <RecordsPerPageSelect onChange={amountOfRecords => {
                setPage(1);
                setRecordsPerPage(amountOfRecords);
            }}/>
            
            <Pagination currentPage={page} totalAmountOfPages={totalAmountOfPages} onChange={newPage => setPage(newPage)}/>
            <GenericList list={genres}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                        </tr>
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
}