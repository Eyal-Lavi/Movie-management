using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace MoviesAPI.Filters
{
    public class ParseBadRequest : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            var result = context.Result as IStatusCodeActionResult;
            if(result != null)
            {
                return;
            }

            var statusCode = result.StatusCode;
            if(statusCode == 400)
            {
                var respnse = new List<string>();
                var badRequestObjectResult = context.Result as BadRequestObjectResult;

                if(badRequestObjectResult.Value is string) // אם התוצאה מכילה הודעה פשוטה (string), מוסיף אותה לרשימת התגובות
                {
                    respnse.Add(badRequestObjectResult.Value.ToString());
                }
                else // אם התוצאה מכילה שגיאות ולידציה, עובר על כל השגיאות ומוסיף אותן לרשימת התגובות.
                {
                    foreach(var key in context.ModelState.Keys)
                    {
                        foreach (var error in context.ModelState[key].Errors)
                        {
                            respnse.Add($"{key}: {error.ErrorMessage}");
                        }
                    }
                }

                context.Result = new BadRequestObjectResult(respnse); // מחזיר את התוצאה החדשה כ-BadRequestObjectResult עם רשימת השגיאות.
            }
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
        }
    }
}
