using System;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetFollowings
{
    public class Query : IRequest<Result<List<UserProfilesDto>>>
    {
        public string Predicate { get; set; } = "followers";
        public required string UserId { get; set; }

    }
    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<List<UserProfilesDto>>>
    {
        public async Task<Result<List<UserProfilesDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profiles = new List<UserProfilesDto>();

            switch (request.Predicate)
            {
                case "followers": //nguoi theo doi~ userid
                    profiles = await context.UserFollowings
                        .Where(x => x.TargetId == request.UserId)
                        .Select(x => x.Observer)
                        .ProjectTo<UserProfilesDto>(mapper.ConfigurationProvider, 
                            new { currentUserId = userAccessor.GetUserId() })
                        .ToListAsync(cancellationToken);
                    break;
                case "followings":  //nguoi userid theo doi~
                    profiles = await context.UserFollowings
                        .Where(x => x.ObserverId == request.UserId)
                        .Select(x => x.Target)
                        .ProjectTo<UserProfilesDto>(mapper.ConfigurationProvider, 
                            new { currentUserId = userAccessor.GetUserId() })
                        .ToListAsync(cancellationToken);
                    break;
            }
            return Result<List<UserProfilesDto>>.Success(profiles);
        }
    }
}
