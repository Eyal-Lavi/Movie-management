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

        [HttpGet("{Id:int}")] // endpoit -> 7139/api/genres/2
        public async Task<ActionResult<Genre>> Get(int Id)
        {
            var genre = await context.Genres.FirstOrDefaultAsync(g => g.Id == Id);

            if (genre == null)
            {
                return NotFound();
            }
            return mapper.Map<Genre>(genre);
        }
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] GenreCreationDTO genreCreationDTO)
        {
            var genre = mapper.Map<Genre>(genreCreationDTO);
            
            context.Add(genre);
            await context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] GenreCreationDTO genreCreationDTO) // update 
        {
            Console.WriteLine($"genreCreationDTO : {genreCreationDTO} , genreCreationDTO?.Name : {genreCreationDTO?.Name}");

            var genre = await context.Genres.FirstOrDefaultAsync(g => g.Id == id);
            
            if (genre == null)
            {
                return NotFound();
            }

            genre = mapper.Map<GenreCreationDTO,Genre>(genreCreationDTO , genre); // משנה את אותו ע"י השמה של ערך חדש שמומר באמצעות ה mapper
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
