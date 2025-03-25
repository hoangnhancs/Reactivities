using System;

namespace Application.Profiles.DTOs;

public class UserProfilesDto
{
    public required string Id { get; set; }
    public required string DisplayName { get; set; }
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }
    public bool Following { get; set; } //current user is following this user?
    public int FollowersCount { get; set; }
    public int FollowingCount { get; set; }
}
