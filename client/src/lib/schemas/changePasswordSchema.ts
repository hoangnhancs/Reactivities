import { z } from "zod";
import { passwordSchema, requiredString } from "../util/util";

export const changePasswordSchema = z.object({
    currentPassword: requiredString('Current password'),
    newPassword: requiredString('New password'),
    confirmPassword: passwordSchema('Confirm password')
})
.refine((data) => data.newPassword == data.confirmPassword, {
    message: 'Passwords must be match',
    path: ['confirmPassword']
})

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>