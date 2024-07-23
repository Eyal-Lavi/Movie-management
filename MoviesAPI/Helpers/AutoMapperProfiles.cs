using AutoMapper;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;

namespace MoviesAPI.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<GenreDTO, Genre>().ReverseMap(); // מיפוי משני הצדדים
            CreateMap<GenreCreationDTO, Genre>();// מיפוי רק  לצד אחד
        }
    }
}
