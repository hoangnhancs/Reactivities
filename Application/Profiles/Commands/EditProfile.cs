using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Commands;

public class EditProfile
{
    public class Command : IRequest<Result<Unit>>
    {
        public string DisplayName { get; set; } = "";
        public string Bio { get; set; } = "";
    }
    public class Handler(IUserAccessor userAccessor, AppDbContext dbContext) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var currrentUser = await userAccessor.GetUserAsync();
            currrentUser.Bio = request.Bio;
            currrentUser.DisplayName = request.DisplayName;
            // dbContext.Entry(currrentUser).State = EntityState.Modified;
            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
            return result 
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Failed to update profile", 400);
        }
    }
}
