import { DateArg, format, formatDistanceToNow } from "date-fns";
import { z, ZodSchema } from "zod";

export function formatDate(date: DateArg<Date>) {
  return format(date, "dd MMM yyyy h:mm a");
}

export const requiredString = (fieldName: string) =>
  z
    .string({ required_error: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` });

export const passwordRules = (fieldName: string) =>
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


    
export function zodToRhfRules(schema: ZodSchema) {
  return {
    validate: (value: unknown) => {
      const result = schema.safeParse(value);
      if (result.success) return true;
      return result.error.errors[0]?.message || "Invalid value";
    },
  };
}

export function timeAgo(date: DateArg<Date>) {
  return formatDistanceToNow(date) + " ago";
}
