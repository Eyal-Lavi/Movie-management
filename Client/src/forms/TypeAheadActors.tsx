import { Typeahead } from "react-bootstrap-typeahead";
import { actorMovieDTO } from "../actors/actors.model";
import { ReactElement, useState } from "react";

export default function TypeAheadActors(props: typeAheadActorsProps){
    
    const actors: actorMovieDTO[] = [
        {id:1 , name: 'Felipe', character:'', picture:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/330px-Tom_Holland_by_Gage_Skidmore.jpg'},
        {id:2 , name: 'Fernando', character:'', picture:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Dwayne_%22The_Rock%22_Johnson_Visits_the_Pentagon_%2841%29_%28cropped%29.jpg/330px-Dwayne_%22The_Rock%22_Johnson_Visits_the_Pentagon_%2841%29_%28cropped%29.jpg'},
        {id:3 , name: 'Jessica', character:'', picture:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Meryl_Streep%2C_Cannes_2024.jpg/330px-Meryl_Streep%2C_Cannes_2024.jpg'}
    ]

    const selected: actorMovieDTO[] = [];

    const [darggedElement , setDarggedElement] = useState<actorMovieDTO | undefined >(undefined);

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
            <Typeahead
                id="typeahead"
                onChange={actors => {
                    const newAct = actors[0] as actorMovieDTO;
                    console.log(actors[0]);
                    if(newAct != undefined && props.actors.findIndex(x => x.id === newAct.id) === -1){
                        const newActors: actorMovieDTO[] = [...props.actors , newAct] 
                        props.onAdd(newActors)
                        console.log("After check ",actors[0]);
                    }
                }}
                options={actors}
                labelKey={(option) =>{
                    const actors = option as actorMovieDTO;
                    return actors.name;
                }}
                filterBy={['name']}
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