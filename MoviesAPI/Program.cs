
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using MoviesAPI.APIBehavior;
using MoviesAPI.Filters;
using System.Text.Json;
namespace MoviesAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            builder.Services.AddCors(options =>
            {
                var frontendURL = builder.Configuration.GetValue<string>("frontend_url"); // משיכה מ - appsettings.Development.json
                Console.WriteLine(frontendURL);
                options.AddDefaultPolicy(builderCors =>
                {
                    builderCors.WithOrigins(frontendURL)
                               .AllowAnyOrigin()// מאפשר לכל מקור לשלוח בקשות
                               .AllowAnyHeader()// מאפשר כל כותרת בבקשה
                               .AllowAnyMethod()// מאפשר כל שיטת HTTP (GET, POST, וכו')
                               .WithExposedHeaders(new string[] { "totalAmountOfRecords" }); // מאפשר חשיפה של הכותרת "totalAmountOfRecords"
                });
            });

            builder.Services.AddAutoMapper(typeof(Program));

            builder.Services.AddControllers(options =>
            {
                options.Filters.Add(typeof(MyExeptionFilter));
                options.Filters.Add(typeof(ParseBadRequest));
            }).ConfigureApiBehaviorOptions(BadRequestsBehavior.Parse);

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();

            // הוספת שירותי Swagger
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MoviesAPI", Version = "v1" });
            });

            builder.Services.AddEndpointsApiExplorer();

            //builder.Host.ConfigureLogging(loggingBuilder =>
            //{
            //    loggingBuilder.ClearProviders(); // Remove default providers
            //    loggingBuilder.AddConsole(); // Add Console provider
            //    // Add any additional providers here
            //    // loggingBuilder.AddProvider(new CustomLoggingProvider()); // Example for a custom provider
            //});

            var app = builder.Build();

            var logger = app.Services.GetRequiredService<ILogger<Program>>();

            // Configure the HTTP request pipeline.

            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MoviesAPI v1"));
            }

            app.UseHttpsRedirection(); // http to https

            app.UseCors();

            app.UseAuthentication();// אימות

            app.UseAuthorization();// הרשאה

            //ReadAndLogResponse(app, logger);

            app.MapControllers();

            app.Run();
        }
    }
}
