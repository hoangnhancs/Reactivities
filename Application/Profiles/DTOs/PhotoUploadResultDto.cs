using System;

namespace Application.Profiles.DTOs;

public class PhotoUploadResultDto
{
    public required string PublicId { get; set; }
    public required string Url { get; set; }
}
