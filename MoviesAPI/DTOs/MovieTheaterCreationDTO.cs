using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.DTOs
{
    public class MovieTheaterCreationDTO
    {
        [Required]
        [StringLength(maximumLength:75, MinimumLength = 1)]
        public string Name { get; set; }
        [Range(-90,90)]
        public double Latitude { get; set; }
        [Range(-180, 180)]
        public double Longitude { get; set; }
    }
}
