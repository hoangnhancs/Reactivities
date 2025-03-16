import { z } from "zod";
import { requiredString } from "../util/util";

export const registerSchema = z.object({
    email: z.string().email(),
    displayName: requiredString('displayname'),
    password: requiredString('password'),
})

export type RegisterSchema = z.infer<typeof registerSchema>