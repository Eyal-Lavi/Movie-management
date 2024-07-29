export interface actorCreationDTO{
    name: string;
    DateOfBirth?: Date;
    picture?: File;
    // pictureURL?: string;
    biography?: string;
}
export interface actorMovieDTO{
    id: number;
    name: string;
    character: string;
    picture: string;
}