using System;
using Microsoft.AspNetCore.Identity;

namespace Domain;

public class User : IdentityUser
{
    public int? DisplayName { get; set; }
    public int? Bio { get; set; }
    public int? ImageUrl { get; set; }
}
