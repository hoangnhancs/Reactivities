using System;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{

    public class Query : IRequest<Result<PageList<ActivityDto, DateTime?>>>
    {
        public required ActivityParams Params { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor)
        : IRequestHandler<Query, Result<PageList<ActivityDto, DateTime?>>>
    {
        public async Task<Result<PageList<ActivityDto, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.Activities
                .OrderBy(x => x.Date)
                .Where(x => x.Date >= (request.Params.Cursor ?? request.Params.StartDate))
                .AsQueryable();

            if (!string.IsNullOrEmpty(request.Params.Filter))
            {
                query = request.Params.Filter switch
                {
                    "isGoing" => query.Where(x => 
                        x.Attendees.Any(a =>a.UserId == userAccessor.GetUserId())),
                    "isHost" => query.Where(x => 
                        x.Attendees.Any(a =>a.IsHost && a.UserId == userAccessor.GetUserId())),
                    _ => query
                };
            }

            var prohjectedActivities = query
                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider, new {currentUserId = userAccessor.GetUserId()});

            var activities = await prohjectedActivities
                .Take(request.Params.PageSize + 1) //lay vuot qua 1, de xem thu co vuot qua pagesize hay k
                .ToListAsync(cancellationToken);

            DateTime? nextCursor = null;

            if (activities.Count > request.Params.PageSize) //neu vuot qua page size, next se la cai cuoi cung
            {
                nextCursor = activities.Last().Date; //set cursor = lastact.date
                activities.RemoveAt(activities.Count - 1); //bo cai cuoi cung
            }

            return Result<PageList<ActivityDto, DateTime?>>.Success(
                new PageList<ActivityDto, DateTime?>
                {
                    Items = activities,
                    NextCursor = nextCursor,
                }
            );
        }
    }
}
