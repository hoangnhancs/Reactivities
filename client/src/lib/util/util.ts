import { DateArg, format, formatDistanceToNow } from "date-fns";
import { z } from "zod";

export function formatDate(date: DateArg<Date>){
    return format(date, 'dd MMM yyyy h:mm a')
}

export const requiredString = (fieldName: string) => z
  .string({required_error: `${fieldName} is required`})
  .min(1, {message: `${fieldName} is required`})

export const passwordSchema = (fieldName: string) =>
  z
    .string({ required_error: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` })
    .min(6, "Password must contain at least 8 characters")
    .max(32, "Password cannot exceed 32 characters")
    .regex(/[A-Z]/, "Must contain at least 1 uppercase letter (A-Z)")
    .regex(/[a-z]/, "Must contain at least 1 lowercase letter (a-z)")
    .regex(/[0-9]/, "Must contain at least 1 digit (0-9)")
    .regex(
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
      "Must contain at least 1 special character (!@#$...)"
    )
    .refine((val) => !/\s/.test(val), "Password cannot contain whitespace");

export function timeAgo(date: DateArg<Date>) {
  return formatDistanceToNow(date) + " ago";
}

