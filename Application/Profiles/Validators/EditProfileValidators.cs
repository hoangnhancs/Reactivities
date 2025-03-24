using System;
using Application.Profiles.Commands;
using FluentValidation;

namespace Application.Profiles.Validators;

public class EditProfileValidators : AbstractValidator<EditProfile.Command>
{
    public EditProfileValidators()
    {
        RuleFor(x => x.DisplayName).NotEmpty();
    }

}