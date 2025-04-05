import { z } from "zod";
import { passwordRules, requiredString } from "../util/util";

export const registerSchema = z.object({
  email: z.string().email(),
  displayName: requiredString("Display name"),
  password: passwordRules("Password"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
