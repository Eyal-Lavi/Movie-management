import LandingPage from "./movies/LandingPage";

import CreateGenre from "./genres/CreateGanre";
import EditGenre from "./genres/EditGenre";
import IndexGenres from "./genres/IndexGenres";

import CreateActor from "./actors/CreateActor";
import EditActor from "./actors/EditActor";
import IndexActors from "./actors/IndexActors";

import CreateMovieTheater from "./movieTheaters/CreateMovieTheater";
import IndexMovieTheaters from "./movieTheaters/IndexMovieTheaters";
import EditMovieTheater from "./movieTheaters/EditMovieTheater";

import EditMovie from "./movies/EditMovie";
import CreateMovie from "./movies/CreateMovie";
import FilterMovies from "./movies/FilterMovies";
import RedirectToLandingPage from "./utils/RedirectToLandingPage";


const routes = [

    {path: '/genres' , component: IndexGenres ,exact:true},
    {path: '/genres/create' , component: CreateGenre},
    {path: '/genres/edit/:id(\\d+)' , component: EditGenre},

    {path: '/actors' , component: IndexActors ,exact:true},
    {path: '/actors/create' , component: CreateActor},
    {path: '/actors/edit/:id(\\d+)' , component: EditActor},

    {path: '/movietheaters' , component: IndexMovieTheaters ,exact:true},
    {path: '/movietheaters/create' , component: CreateMovieTheater},
    {path: '/movietheaters/edit/:id(\\d+)' , component: EditMovieTheater},

    
    {path: '/movies/create' , component: CreateMovie},
    {path: '/movies/edit/:id(\\d+)' , component: EditMovie},
    {path: '/movies/filter' , component: FilterMovies},

    {path: '/' , component: LandingPage , exact:true},
    {path: '*' , component: RedirectToLandingPage},
];

export default routes;