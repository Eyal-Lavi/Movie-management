using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MoviesAPI.APIBehavior;
using MoviesAPI.Filters;
using MoviesAPI.Helpers;

namespace MoviesAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddControllers(options =>
            {
                options.Filters.Add(typeof(MyExeptionFilter));
                options.Filters.Add(typeof(ParseBadRequest));
            }).ConfigureApiBehaviorOptions(BadRequestsBehavior.Parse);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MoviesAPI", Version = "v1" });
            });

            services.AddCors(options =>
            {
                var frontendURL = Configuration.GetValue<string>("frontend_url"); // משיכה מ - appsettings.Development.json
                Console.WriteLine(frontendURL);
                options.AddDefaultPolicy(builderCors =>
                {
                    builderCors.WithOrigins(frontendURL)
                               .AllowAnyOrigin()// מאפשר לכל מקור לשלוח בקשות
                               .AllowAnyHeader()// מאפשר כל כותרת בבקשה
                               .AllowAnyMethod()// מאפשר כל שיטת HTTP (GET, POST, וכו')
                               .WithExposedHeaders(new string[] { "totalAmountOfRecords" }); // מאפשר חשיפה של הכותרת "totalAmountOfRecords" (שהלקוח יראה את זה)
                });
            });

            services.AddAutoMapper(typeof(Startup));

            services.AddScoped<IFileStorageService, AzureStorageService>();

            //services.AddScoped<IFileStorageService, InAppStorageService>();// For Save local
            //services.AddHttpContextAccessor();// For Save local

            services.AddEndpointsApiExplorer(); // תיעוד נקודות קצה ב (swagger)
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MoviesAPI v1"));
            }

            app.UseHttpsRedirection(); // http to https

            //app.UseStaticFiles(); // For Save local

            app.UseRouting(); // שימוש בניווט

            app.UseCors();

            app.UseAuthentication(); // אימות

            app.UseAuthorization(); // הרשאה


            app.UseEndpoints(endpoints => // שולח לפי הנתונים שהתקבלו ב useRoutning
            {
                endpoints.MapControllers();
            });
        }
    }
}
