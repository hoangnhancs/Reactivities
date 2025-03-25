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

public class GetProfile
{
    public class Query : IRequest<Result<UserProfilesDto>>
    {
        public required string UserId { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<UserProfilesDto>>
    {
        public async Task<Result<UserProfilesDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profile = await context.Users
                .ProjectTo<UserProfilesDto>(mapper.ConfigurationProvider,
                    new { currentUserId = userAccessor.GetUserId() })
                .SingleOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);
            //có thể map được từ user sang userprofiles 
            // vì tất cả thuộc tính của user profiles có thì user đều có

            return profile == null
                ? Result<UserProfilesDto>.Failure("Profile not found", 400)
                : Result<UserProfilesDto>.Success(profile);
        }
    }
}
