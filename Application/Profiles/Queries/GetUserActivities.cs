using System;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetUserActivities
{
    public class Query : IRequest<Result<List<UserActivityDto>>>
    {
        public required string UserId { get; set; }
        public required string Filter { get; set; }
    }
    public class Handler (AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<UserActivityDto>>>
    {
        public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.ActivityAttendees
                .Where(x => x.UserId == request.UserId)
                .OrderBy(a => a.Activity.Date)
                .Select(x => x.Activity)
                .AsQueryable();
            var today = DateTime.UtcNow;
            switch (request.Filter)
            {
                case "hosting":
                    query = query.Where(a => a.Attendees.Any(x => x.IsHost && x.UserId == request.UserId));
                    break;
                case "future":
                    query = query.Where(x => x.Date > today && x.Attendees.Any(a => a.UserId == request.UserId));
                    break;                
                case "past":
                    query = query.Where(x => x.Date <= today && x.Attendees.Any(a => a.UserId == request.UserId));
                    break;
            }
            var projectedActivities = query.ProjectTo<UserActivityDto>(mapper.ConfigurationProvider);
            var activities = await projectedActivities.ToListAsync(cancellationToken);
            return Result<List<UserActivityDto>>.Success(activities);
        }
    }
}
