using MoviesAPI.DTOs;

namespace MoviesAPI.Helpers
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> queryable, PaginationDTO paginationDTO)
        {
            return queryable
                .Skip((paginationDTO.Page - 1) * paginationDTO.RecordsPerPage)// דילוג על רשומות של עמודים קודמים.
                .Take(paginationDTO.RecordsPerPage);// לקיחת מספר הרשומות לעמוד הנוכחי.
        }
    }
}
