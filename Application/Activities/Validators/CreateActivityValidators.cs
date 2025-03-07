using System;
using Application.Activities.Commands;
using FluentValidation;

namespace Application.Activities.Validators;

public class CreateActivityValidators : AbstractValidator<CreateActivity.Command>
{
    public CreateActivityValidators()
    {
        RuleFor(x => x.ActivityDto.Title).NotEmpty().WithMessage("Title is required");
        RuleFor(x => x.ActivityDto.Description).NotEmpty().WithMessage("Description is required");
    }

}
