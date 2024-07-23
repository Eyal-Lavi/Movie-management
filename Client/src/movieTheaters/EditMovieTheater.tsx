import MovieTheaterForm from "./MovieTheaterForm";

export default function EditMovieTheater(){
    return(
        <>
            <h3>Edit Movie Theater</h3>
            <MovieTheaterForm 
                model={{name:'Sambil' ,
                    latitude: 32.100958963482896,
                    longitude: 34.8268164766466}}
                onSubmit={async values => {
                    await new Promise((r) => setTimeout(r , 1000));
                    console.log(values);
                }}
            />
        </>
    )
}