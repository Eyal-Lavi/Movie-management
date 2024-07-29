using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Helpers;

namespace MoviesAPI.Controllers
{
    [Route("api/actors")]
    public class ActorsController : ControllerBase
    {
        private readonly ILogger logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public ActorsController(ILogger<ActorsController> logger, ApplicationDbContext context, IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]// endpoit -> 7139/api/actors
        public async Task<ActionResult<List<ActorDTO>>> Get([FromQuery] PaginationDTO pagination)
        {
            //var queryable = context.Actors.AsQueryable();

            //await HttpContext.InsertParametersPaginationInHeader(queryable);

            //var actors = await queryable.OrderBy(x => x.Name).Pagination(pagination).ToListAsync();

            //return mapper.Map<List<ActorDTO>>(actors);// map actor entites to actorsDTO


            var actors = await context.Actors.ToListAsync();
            return mapper.Map<List<ActorDTO>>(actors);// map actor entites to actorsDTO
        }

        [HttpGet("{id:int}")]// endpoit -> 7139/api/actors/id:int
        public async Task<ActionResult<ActorDTO>> Get(int id)
        {
            var actor = await context.Actors.FirstOrDefaultAsync(actor => actor.Id == id);

            if (actor == null)
            {
                return NotFound();
            }

            return mapper.Map<ActorDTO>(actor);
        }
        [HttpPost]// endpoit -> 7139/api/actors
        public async Task<ActionResult> Post([FromForm] ActorCreationDTO actorCreationDTO)
        {
            //var actor = mapper.Map<Actor>(actorCreationDTO);
            //context.Actors.Add(actor);
            //await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] ActorCreationDTO actorCreationDTO)
        {
            var actor = await context.Actors.FirstOrDefaultAsync(actor => actor.Id == id);

            if (actor == null)
            {
                return NotFound();
            }

            mapper.Map<ActorCreationDTO, Actor>(actorCreationDTO, actor);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]// endpoit -> 7139/api/actors/id:int
        public async Task<ActionResult> Delete(int id)
        {
            var exists = await context.Actors.AnyAsync(actor => actor.Id == id);

            if (!exists)
            {
                return NotFound();
            }

            context.Actors.Remove(new Actor { Id = id });
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
