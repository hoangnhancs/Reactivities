using System;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class BaseActivityValidators<T, TDto> : AbstractValidator<T> where TDto 
    : BaseActivityDto
{
    public BaseActivityValidators(Func<T, TDto> selector)
    {
        RuleFor(x => selector(x).Title)
            .NotEmpty().WithMessage("Title is required")
            .MaximumLength(100).WithMessage("Title must exceed 100 characters");
        RuleFor(x => selector(x).Description)
            .NotEmpty().WithMessage("Description is required");
        RuleFor(x => selector(x).Date)
            .GreaterThan(DateTime.UtcNow).WithMessage("Date must be in the future");
        RuleFor(x => selector(x).Category)
            .NotEmpty().WithMessage("Category is required");
        RuleFor(x => selector(x).City)
            .NotEmpty().WithMessage("City is required");
        RuleFor(x => selector(x).Venue)
            .NotEmpty().WithMessage("Venue is required");
        RuleFor(x => selector(x).Latitude)
            .InclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 and 90")
            .NotEmpty().WithMessage("Latitude is required");
        RuleFor(x => selector(x).Longitude)
            .InclusiveBetween(-190, 180).WithMessage("Longtitude must be between -190 and 180")
            .NotEmpty().WithMessage("Longtitude is required");
    }
}
