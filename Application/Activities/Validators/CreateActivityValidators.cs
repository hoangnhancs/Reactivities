using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class CreateActivityValidators 
    : BaseActivityValidators<CreateActivity.Command, CreateActivityDto>
{
    public CreateActivityValidators() : base(x => x.ActivityDto)
    {
        

    }

}
