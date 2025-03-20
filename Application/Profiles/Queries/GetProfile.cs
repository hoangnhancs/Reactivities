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
    public class Query : IRequest<Result<UserProfiles>>
    {
        public required string UserId { get; set; }
    }

    public class Handler (AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<UserProfiles>>
    {
        public async Task<Result<UserProfiles>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profile = await context.Users
                .ProjectTo<UserProfiles>(mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);
            //có thể map được từ user sang userprofiles 
            // vì tất cả thuộc tính của user profiles có thì user đều có

            return profile == null 
                ? Result<UserProfiles>.Failure("Profile not found", 400)
                : Result<UserProfiles>.Success(profile);                
        }
    }
}
