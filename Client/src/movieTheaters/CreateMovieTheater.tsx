import MovieTheaterForm from "./MovieTheaterForm";

export default function CreateMovieTheater(){
    return(
        <>
            <h3>Create Movie Theater</h3>
            <MovieTheaterForm 
                model={{name:''}}
                onSubmit={async values => {
                    await new Promise( r => setTimeout(r , 1000));
                    console.log(values);
                }}
            />
        </>
    )
}