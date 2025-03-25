using System;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<ActivityDto>> //interface MediatR.IRequest<out TResponse>
    {
        public required string Id {get; set;}
    }
    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<ActivityDto>>
    {
        public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider,
                    new { currentUserId = userAccessor.GetUserId() })
                .FirstOrDefaultAsync(x => request.Id == x.Id, cancellationToken);
            if (activity == null) 
                return Result<ActivityDto>.Failure("Activity not found", 404); //Failure(core/result.cs) {Code: 404, error:"Activity not found", isSuccess:false, value: Activity=null} 
            
            // var activitydto = mapper.Map<ActivityDto>(activity);
            return Result<ActivityDto>.Success(activity);          
        }
    }
}
