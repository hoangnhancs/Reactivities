using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Profiles.Commands;

public class DeletePhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor, IPhotoServices photoServices)
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();
            var photoDeleted = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);
            
            if (photoDeleted == null) return Result<Unit>.Failure("Cannot find photo", 400);
            
            if (photoDeleted.Url == user.ImageUrl) return Result<Unit>.Failure("Cannot delete main photo", 400);
            
            await photoServices.DeletePhoto(photoDeleted.PublicId);
            user.Photos.Remove(photoDeleted);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result 
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem deleting photo", 400);
        }
    }
}
