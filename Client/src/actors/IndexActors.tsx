import { Link } from "react-router-dom";

export default function IndexActors(){
    return(<>
        <h1>Index Actor</h1>
        <Link to='/actors/create' className='btn btn-primary'>Create actor</Link>
    </>)
}