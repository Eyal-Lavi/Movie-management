
using Azure.Storage.Blobs;

namespace MoviesAPI.Helpers
{
    public class AzureStorageService : IFileStorageService
    {
        private string connectionString;
        public AzureStorageService()
        {
            connectionString = Properties.Resources.AzureStorageConnection;
        }

        public async Task DeleteFile(string fileRoute, string containerName)
        {
            if (string.IsNullOrEmpty(fileRoute))
            {
                return;
            }

            //יוצר אובייקט BlobContainerClient שמתחבר לקונטיינר ב-Azure Blob Storage.
            var client = new BlobContainerClient(connectionString, containerName);

            // יצירת הקונטיינר אם הוא לא קיים כבר
            await client.CreateIfNotExistsAsync();

            //קבלת שם הקובץ מתוך הנתיב כולל סיומת
            var fileName = Path.GetFileName(fileRoute);

            //יוצר אובייקט BlobClient
            //שמייצג את הקובץ בתוך הקונטיינר מאפשר לבצע פעולות על הקובץ, כמו מחיקה, העלאה והורדה
            var blob = client.GetBlobClient(fileName);

            //מחיקת הקובץ אם הוא קיים
            await blob.DeleteIfExistsAsync();

        }

        public async Task<string> EditFile(string containerName, IFormFile file, string fileRoute)
        {
            await DeleteFile(fileRoute, containerName);
            return await SaveFile(containerName, file);
        }

        public async Task<string> SaveFile(string containerName, IFormFile file)
        {
            // יצירת אובייקט BlobContainerClient המייצג את הקונטיינר באחסון Azure
            var client = new BlobContainerClient(connectionString, containerName);

            // יצירת הקונטיינר אם הוא לא קיים כבר
            await client.CreateIfNotExistsAsync();

            // הגדרת מדיניות גישה ציבורית לקונטיינר
            client.SetAccessPolicy(Azure.Storage.Blobs.Models.PublicAccessType.Blob);

            // קבלת הסיומת של שם הקובץ המקורי
            var extension = Path.GetExtension(file.FileName);

            // יצירת שם ייחודי לקובץ באמצעות GUID
            var fileName = $"{Guid.NewGuid()}{extension}";

            // יצירת אובייקט BlobClient המייצג את הקובץ באחסון Azure
            var blob = client.GetBlobClient(fileName);

            // פתיחת זרם קריאה של הקובץ המועלה
            using (var stream = file.OpenReadStream())
            {
                // העלאת תוכן הקובץ לאחסון Azure Blob
                await blob.UploadAsync(stream);
            }

            // החזרת ה-URL של הקובץ המועלה
            return blob.Uri.ToString();
        }
    }
}
