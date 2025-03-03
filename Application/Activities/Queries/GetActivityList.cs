using System;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<List<Activity>> {}
    public class Handler(AppDbContext context) : IRequestHandler<Query, List<Activity>>
    // ILogger<GetActivityList> logger
    {
        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            //example ve cach su dung cancelationToken
            // try
            // {
            //     for (int i = 0; i < 10; i++)
            //     {
            //         // cancellationToken.ThrowIfCancellationRequested();
            //         //Task.Delay(1000, cancellationToken) đã tự kiểm tra
            //         // hủy nên không cần ThrowIfCancellationRequested()
            //         //đa số chúng ta nên có dòng này
            //         await Task.Delay(1000, cancellationToken);
            //         logger.LogInformation($"Task {i} has completed");
            //     }
            // }
            // catch (OperationCanceledException)  //chi can catch OperationCanceledException la duoc r
            //                                     //them canceltoken o controller
            // {
                
            //     logger.LogInformation("Task was cancelled");
            // }
            return await context.Activities.ToListAsync(cancellationToken);
        }
    }
}
