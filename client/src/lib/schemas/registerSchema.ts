import { z } from "zod";
import { passwordSchema, requiredString } from "../util/util";

export const registerSchema = z.object({
    email: z.string().email(),
    displayName: requiredString('Display name'),
    password: passwordSchema('Password'),
})

export type RegisterSchema = z.infer<typeof registerSchema>