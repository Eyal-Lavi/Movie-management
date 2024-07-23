import ActorForm from "./ActorForm";

export default function CreateActor(){
    return(<>
        <h1>Create Actor</h1>
        <ActorForm 
            model={{
                biography:'',
                name:'',
                dateOfBirt: undefined,
            }} onSubmit={async (values)=>{
                await new Promise((r)=> setTimeout(r , 1000));
                console.log(values);
            }}/>
    </>)
}