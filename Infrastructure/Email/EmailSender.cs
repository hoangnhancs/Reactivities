using System;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;
using Resend;

namespace Infrastructure.Email;

public class EmailSender(IResend resend, IConfiguration config) : IEmailSender<User>
{
    public async Task SendConfirmationLinkAsync(User user, string email, string confirmationLink)
    {
        var subject = "Confirm your email address";
        var body = $@"
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='UTF-8'>
                <title>Verify Your Email Address</title>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .button {{ display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px; margin: 15px 0; }}
                    .footer {{ margin-top: 30px; font-size: 0.9em; color: #777; }}
                </style>
            </head>
            <body>
                <p>Hi {user.DisplayName},</p>
                <p>Thank you for registering with us! To complete your registration, please verify your email address by clicking the button below:</p>
                <p><a href='{confirmationLink}' class='button'>Verify Email Address</a></p>
                <p>If you didn't create an account with us, please ignore this email.</p>
                <div class='footer'>
                    <p>Best regards,</p>
                    <p>The Reactivities Team</p>
                </div>
            </body>
            </html>";

        await SendMailAsync(email, subject, body);
    }

    public async Task SendPasswordResetCodeAsync(User user, string email, string resetCode)
    {
        var subject = "Reset password Reactivities";
        var body = $@"
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='UTF-8'>
                <title>Password Reset Request</title>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .button {{ display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px; margin: 15px 0; }}
                    .footer {{ margin-top: 30px; font-size: 0.9em; color: #777; }}
                    .note {{ font-size: 0.9em; color: #666; }}
                </style>
            </head>
            <body>
                <p>Hi {user.DisplayName},</p>
                <p>We received a request to reset your password. If you made this request, please click the button below to set a new password:</p>
                <p><a href='{config["ClientAppUrl"]}/reset-password?email={email}&code={resetCode}' class='button'>
                    Reset Password</a>
                </p>
                <p class='note'>This link will expire in 4 hours. If you don't use it by then, you'll need to request another password reset.</p>
                <p>If you didn't request a password reset, please ignore this email or contact our support team if you have concerns.</p>
                <div class='footer'>
                    <p>Best regards,</p>
                    <p>The Reactivities Team</p>
                </div>
            </body>
            </html>"; //this link bring me to reset pw component

        await SendMailAsync(email, subject, body);
    }

    public Task SendPasswordResetLinkAsync(User user, string email, string resetLink)
    {
        throw new NotImplementedException();
    }

    private async Task SendMailAsync(string email, string subject, string body)
    {
        var message = new EmailMessage
        {
            From = "whatever@resend.dev",
            Subject = subject,
            HtmlBody = body,
        };
        message.To.Add(email);

        Console.WriteLine(message.HtmlBody);

        await resend.EmailSendAsync(message);
        await Task.CompletedTask;
    }
}
