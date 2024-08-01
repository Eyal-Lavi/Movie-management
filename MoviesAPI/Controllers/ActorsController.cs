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
        private readonly IFileStorageService fileStorageService;
        private readonly string containerName = "actors";

        public ActorsController(ILogger<ActorsController> logger, ApplicationDbContext context, IMapper mapper, IFileStorageService fileStorageService)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
            this.fileStorageService = fileStorageService;
        }

        [HttpGet]// endpoit -> 7139/api/actors
        public async Task<ActionResult<List<ActorDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Actors.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var actors = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
            queryable.Paginate(paginationDTO);

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
            var actor = mapper.Map<Actor>(actorCreationDTO);

            if (actorCreationDTO.Picture != null)
            {
                actor.Picture = await fileStorageService.SaveFile(containerName, actorCreationDTO.Picture);
            }

            context.Actors.Add(actor);
            await context.SaveChangesAsync();
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

            actor = mapper.Map<ActorCreationDTO, Actor>(actorCreationDTO, actor);

            if(actorCreationDTO.Picture != null)
            {
                actor.Picture = await fileStorageService
                    .EditFile(containerName, actorCreationDTO.Picture, actor.Picture);
            }

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]// endpoit -> 7139/api/actors/id:int
        public async Task<ActionResult> Delete(int id)
        {
            var actor = await context.Actors.FirstOrDefaultAsync(actor => actor.Id == id);

            if (actor == null)
            {
                return NotFound();
            }
            
            context.Actors.Remove(actor);
            await context.SaveChangesAsync();
            await fileStorageService.DeleteFile(actor.Picture, containerName);
            return NoContent();
        }
    }
}
