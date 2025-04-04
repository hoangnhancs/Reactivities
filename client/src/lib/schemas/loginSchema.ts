import { z } from "zod"
import { passwordSchema } from "../util/util"

export const loginSchema = z.object({
    email: z.string().email(),
    password: passwordSchema("Password"),
})

export type LoginSchema = z.infer<typeof loginSchema>