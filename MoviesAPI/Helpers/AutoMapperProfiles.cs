using AutoMapper;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using NetTopologySuite.Geometries;

namespace MoviesAPI.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles(GeometryFactory geometryFactory)
        {
            CreateMap<GenreDTO, Genre>().ReverseMap(); // מיפוי משני הצדדים
            CreateMap<GenreCreationDTO, Genre>();// מיפוי רק  לצד אחד

            CreateMap<ActorDTO, Actor>().ReverseMap();
            CreateMap<ActorCreationDTO, Actor>()
                .ForMember(x => x.Picture, option => option.Ignore());//בחלק זה של המיפוי אנו מוודאים כי ערך התמונה לא יוחלף אלא אם כן משתמש קלט תמונה חדשה.

            CreateMap<MovieTheater, MovieTheaterDTO>()
                .ForMember(x => x.Latitude, dto => dto.MapFrom(prop => prop.Location.Y))
                .ForMember(x => x.Longitude, dto => dto.MapFrom(prop => prop.Location.X));

            CreateMap<MovieTheaterCreationDTO, MovieTheater>()
                .ForMember(x => x.Location, x => x.MapFrom(dto =>
                geometryFactory.CreatePoint(new Coordinate(dto.Longitude,dto.Latitude))));
        }
    }
}