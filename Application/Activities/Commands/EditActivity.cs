using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .FindAsync([request.Activity.Id], cancellationToken)
                    ?? throw new Exception("Cannot find activity");

            // activity.Title = request.Activity.Title;

            mapper.Map(request.Activity, activity);
            //phai vo Nuget -> install AutoMapper cho Application.csprj

            //how to update all properties

            //SOLUTION 1:
            //context.Entry(activity).CurrentValues.SetValues(request.Activity); //include primarykey Id

            //SOLUTION 2:
            // foreach (var property in typeof(Activity).GetProperties())
            // {
            //     // Bỏ qua khóa chính để tránh lỗi khi cập nhật
            //     if (property.Name == "Id") continue;

            //     var newValue = property.GetValue(request.Activity);
            //     property.SetValue(activity, newValue);
            // }
            //exclude primarykey Id

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
