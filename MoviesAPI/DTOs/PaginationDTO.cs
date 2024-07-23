namespace MoviesAPI.DTOs
{
    public class PaginationDTO
    {
        public int Page { get; set; } = 1;// מספר העמוד הנוכחי, ברירת מחדל היא 1.

        private int recordsPerPages = 10;// מספר הרשומות לעמוד, ברירת מחדל היא 10.
        private readonly int maxRecordsPerPages = 50;// מקסימום רשומות לעמוד.

        public int RecordsPerPage
        {
            get
            {
                return recordsPerPages;
            }
            set
            {
                recordsPerPages = value > maxRecordsPerPages ? maxRecordsPerPages : value;
            }
        }
    }
}
