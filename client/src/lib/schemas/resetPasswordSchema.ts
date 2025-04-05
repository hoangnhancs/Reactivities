import { z } from "zod";
import { passwordRules } from "../util/util";

export const resetPasswordSchema = z
  .object({

    newPassword: passwordRules("New password"),
    confirmPassword: passwordRules("Confirm password"),
  })
  .refine((data) => data.newPassword == data.confirmPassword, {
    message: "Passwords must be match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
