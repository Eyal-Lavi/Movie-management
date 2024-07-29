import { useParams } from "react-router-dom";
import ActorForm from "./ActorForm";

export default function EditActor(){
    // const { id }:any = useParams();

    return(<>
        <h1>Edit actor</h1>
        <ActorForm 
            model={{
                name:'Tom Holland',
                dateOfBirth: new Date('1996-06-01T00:00:00'),
                biography:`# Something
                This person was born in **DR**`,
                pictureURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg/330px-Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg'
            }} onSubmit={async (values)=>{
                await new Promise(r => setTimeout(r , 1000));
                console.log(values);
            }}/>
    </>)
}