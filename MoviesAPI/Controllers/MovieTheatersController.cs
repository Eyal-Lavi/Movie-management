﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;

namespace MoviesAPI.Controllers
{
    [ApiController]
    [Route("api/movietheaters")]
    public class MovieTheatersController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public MovieTheatersController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<MovieTheaterDTO>>> Get()
        {
            var entities = await context.MovieTheaters.ToListAsync();
            return mapper.Map<List<MovieTheaterDTO>>(entities);
        }
        
        [HttpGet("{id:int}")]
        public async Task<ActionResult<MovieTheaterDTO>> Get(int id)
        {
            var movieTheater = await context.MovieTheaters.FirstOrDefaultAsync(x => x.Id == id);

            if(movieTheater == null)
            {
                return NotFound();
            }
            return mapper.Map<MovieTheaterDTO>(movieTheater);
        }

        [HttpPost]
        public async Task<ActionResult> Post(MovieTheaterCreationDTO movieCreationDTO)
        {
            var movieTheater = mapper.Map<MovieTheater>(movieCreationDTO);

            context.Add(movieTheater);
            await context.SaveChangesAsync();
            return NoContent();
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id ,MovieTheaterCreationDTO movieCreationDTO)
        {
            var movieTheater = await context.MovieTheaters.FirstOrDefaultAsync(x => x.Id == id);

            if (movieTheater == null)
            {
                return NotFound();
            }

            movieTheater = mapper.Map(movieCreationDTO, movieTheater);
            await context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var movieTheater = await context.MovieTheaters.FirstOrDefaultAsync(x => x.Id == id);

            if (movieTheater == null)
            {
                return NotFound();
            }

            context.Remove(movieTheater);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
