import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import customConfirm from "./customConfirm";
import GenericList from "./GenericList";
import Pagination from "./Pagination";
import RecordsPerPageSelect from "./RecordsPerPageSelect";

export default function IndexEntity<T>(props: indexEntityProps<T>){
    const [entities , setEntities] = useState<T[]>();
    const [totalAmountOfPages , setTotalAmountOfPages] = useState(0); // סכום העמודים הכולל
    const [recordsPerPage , setRecordsPerPage] = useState(5); // כמות עמודות בדף
    const [page , setPage] = useState(1); // העמוד הנוכחי

    useEffect(()=>{
       loadData();
    },[page , recordsPerPage]);

    const loadData = () => {
        axios.get(props.url , {
            params: {page , recordsPerPage}
        })
            .then((response: AxiosResponse<T[]>) => {
                const totalAmountOfRecords = parseInt(response.headers['totalamountofrecords'], 10);
                setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage))
                setEntities(response.data);
            })
    }
    const deleteEntity = async (id: number)=>{
        try{
            await axios.delete(`${props.url}/${id}`);
            loadData();
        }
        catch(error){
            if(axios.isAxiosError(error) && error.response){
                console.error(error.response.data);
            }
        }
    }

    const buttons = (editUrl: string , id: number) =><>
          <Link className="btn btn-success"
                                     to={editUrl}>Edit</Link>
                                    <Button 
                                        className="btn btn-danger" 
                                        onClick={()=> customConfirm(() => deleteEntity(id))}>Delete</Button>
                                
    </>
    return(
        <>
            <h3>{props.title}</h3>
            <Link className="btn btn-primary" to={props.createUrl}>Create {props.entityName}</Link>

            <RecordsPerPageSelect onChange={amountOfRecords => {
                setPage(1);
                setRecordsPerPage(amountOfRecords);
            }}/>
            
            <Pagination currentPage={page} totalAmountOfPages={totalAmountOfPages} onChange={newPage => setPage(newPage)}/>
            
            <GenericList list={entities}>
                <table className="table table-striped">
                    {props.children(entities! , buttons)}
                </table>
            </GenericList>
        </>
    )
}

interface indexEntityProps<T>{
    url: string;
    createUrl: string;
    title: string;
    entityName: string;
    children(
                entities:T[], 
                buttons : (editUrl: string , id: number) => ReactElement
              ) : ReactElement;
}