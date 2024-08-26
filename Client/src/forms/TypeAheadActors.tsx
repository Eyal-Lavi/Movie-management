import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { actorDTO, actorMovieDTO } from "../actors/actors.model";
import { ReactElement, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlActors } from "../endpoints";

export default function TypeAheadActors(props: typeAheadActorsProps){
    
    const [actors , setActors] = useState<actorMovieDTO[]>([])
    const [isLoading , setIsLoading] = useState(false);

    const selected: actorMovieDTO[] = [];

    const [darggedElement , setDarggedElement] = useState<actorMovieDTO | undefined >(undefined);

    function handleSearch(query: string){
        setIsLoading(true);
        axios.get(`${urlActors}/searchByName/${query}`)
            .then((response: AxiosResponse<actorMovieDTO[]>) =>{
                setActors(response.data);
                setIsLoading(false);
            })
    }
    function handleDragStart(actor: actorMovieDTO){
        setDarggedElement(actor);
    }
    function handleDragOver(actor: actorMovieDTO){
        if(!darggedElement){
            return;
        }
        if(actor.id !== darggedElement.id){
            const draggedElementIndex = props.actors.findIndex(x => x.id === darggedElement.id);
            const actorIndex = props.actors.findIndex(x => x.id === actor.id);

            const actors = [...props.actors];
            actors[actorIndex] = darggedElement;
            actors[draggedElementIndex] = actor;
            props.onAdd(actors);
        }
    } 
    return(
        <div className="mb-3">
            <label>{props.displayName}</label>
            <AsyncTypeahead
                id="typeahead"
                onChange={actors => {
                    const newAct = actors[0] as actorMovieDTO;
                    if(newAct != undefined && props.actors.findIndex(x => x.id === newAct.id) === -1){
                        // newAct.character = '';
                        const newActors: actorMovieDTO[] = [...props.actors , newAct] 
                        props.onAdd(newActors)
                        // console.log("After check ",actors[0]);
                    }
                }}
                options={actors}
                labelKey={(option) =>{
                    const actors = option as actorMovieDTO;
                    return actors.name;
                }}
                filterBy={() => true}
                isLoading={isLoading}
                onSearch={handleSearch}
                placeholder="Write the name of the actor..."
                minLength={1}
                flip={true}
                selected={selected}
                renderMenuItemChildren={(option) => {
                    const actor = option as actorMovieDTO;
                    return(
                        <>
                            <img alt="actor" src={actor.picture}
                                style={{
                                    height: '64px',
                                    marginRight: '10px',
                                    width:'64px',
                                }}
                            />
                            <span>{actor.name}</span>
                        </>
                    );
                }}
            />
            <ul className="list-group"> 
                 {props.actors.map(actor => <li 
                    key={actor.id}
                    draggable={true}
                    onDragStart={() => handleDragStart(actor)}
                    onDragOver={() => handleDragOver(actor)}
                    className="list-group-item list-group-item-action"
                 >
                    {props.listUI(actor)}
                    <span className="badge badge-primary badge-pill pointer text-dark"
                    style={{marginLeft:'0.5rem'}}
                    onClick={() => props.onRemove(actor)}
                    >X</span>
                 </li>)}
            </ul>
        </div>
    )
}

interface typeAheadActorsProps{
    displayName: string;
    actors: actorMovieDTO[];
    onAdd(actors: actorMovieDTO[]): void;
    onRemove(actor: actorMovieDTO): void;
    listUI(actor: actorMovieDTO): ReactElement;
}