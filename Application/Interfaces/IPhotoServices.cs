using System;
using Application.Profiles.DTOs;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;

public interface IPhotoServices
{
    Task<PhotoUploadResultDto?> UploadPhoto(IFormFile file);
    Task<string> DeletePhoto(string publicId);
}
