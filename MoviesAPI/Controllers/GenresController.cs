using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Filters;
using MoviesAPI.Helpers;

namespace MoviesAPI.Controllers
{
    [Route("api/genres")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly ILogger<GenresController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public GenresController(ILogger<GenresController> logger, ApplicationDbContext context, IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]// endpoit -> 7139/api/genres
        public async Task<ActionResult<List<GenreDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Genres.AsQueryable(); // יצירת IQueryable לכל הז'אנרים.
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var genres = await queryable.OrderBy(x => x.Name).Pagination(paginationDTO).ToListAsync();// עימוד ומיון הז'אנרים.

            return mapper.Map<List<GenreDTO>>(genres);// map genre entites to genreDTO
        }

        [HttpGet("{Id:int}", Name = "getGenre")] // endpoit -> 7139/api/genres/2
        public async Task<ActionResult<Genre>> Get(int Id)
        {
            logger.LogCritical($"Getting genre by id {Id}");
            var genre = await context.Genres.FirstOrDefaultAsync(g => g.Id == Id);

            if (genre == null)
            {
                return NotFound();
            }

            return Ok(genre);
        }
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] GenreCreationDTO GenreCreationDTO)
        {
            var genre = mapper.Map<Genre>(GenreCreationDTO);

            context.Add(genre);
            await context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPut]
        public async Task<ActionResult> Put([FromBody] Genre genre) // update 
        {
            //Console.WriteLine(genre.Id + genre.Name);
            var genreToUpdate = await context.Genres.FirstOrDefaultAsync(g => g.Id == genre.Id);

            if (genreToUpdate == null)
            {
                return NotFound();
            }

            genreToUpdate.Name = genre.Name;
            await context.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete]
        public async Task<ActionResult> Delete([FromHeader] int Id)
        {
            Console.WriteLine(Id);
            var genre = await context.Genres.FirstOrDefaultAsync(g => g.Id == Id);

            if (genre == null)
            {
                return NotFound();
            }

            context.Genres.Remove(genre);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
