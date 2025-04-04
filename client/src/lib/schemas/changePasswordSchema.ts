import { z } from "zod";
import { passwordRules, requiredString } from "../util/util";

export const changePasswordSchema = z
  .object({
    currentPassword: requiredString("Current password"),
    newPassword: passwordRules("New password"),
    confirmPassword: passwordRules("Confirm password"),
  })
  .refine((data) => data.newPassword == data.confirmPassword, {
    message: "Passwords must be match",
    path: ["confirmPassword"],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
