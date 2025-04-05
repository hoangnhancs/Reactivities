import { z } from "zod";
import { passwordRules } from "../util/util";

export const loginSchema = z.object({
  email: z.string().email(),
  password: passwordRules("Password"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
