using System;
using System.Reflection.Metadata.Ecma335;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.VisualBasic;
using Persistence;


namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<string>> //out Result<string>
    {
  
        public required CreateActivityDto ActivityDto { get; set; }
    }
    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            var activity = mapper.Map<Activity>(request.ActivityDto);
            context.Activities.Add(activity);
            //phải add trước khi add attendee vì khi add vào context activity.id mới có giá trị
            var attendee = new ActivityAttendee
            {
                ActivityId = activity.Id,
                UserId = user.Id,
                IsHost = true,
            };
            activity.Attendees.Add(attendee);
            //attendee thêm vào sau cũng được, vì hiện tại activity đang được lưu trong bộ nhớ, chưa lưu vào dtb
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<string>.Failure("fail to create activity", 400);
            return Result<string>.Success(activity.Id);
        }      
    }
}
