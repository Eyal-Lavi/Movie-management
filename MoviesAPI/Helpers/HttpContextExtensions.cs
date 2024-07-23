using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace MoviesAPI.Helpers
{
    public static class HttpContextExtensions
    {
        public async static Task InsertParametersPaginationInHeader<T>(this HttpContext httpContext, IQueryable<T> queryable)
        {
            if (httpContext == null) { throw new ArgumentNullException(nameof(httpContext)); }

            double count = await queryable.CountAsync();// ספירת הרשומות הכוללת במסד הנתונים.

            httpContext.Response.Headers.Add("totalAmountRecords", count.ToString());// הוספת מספר הרשומות הכולל לכותרות התגובה.
        }
    }
}
