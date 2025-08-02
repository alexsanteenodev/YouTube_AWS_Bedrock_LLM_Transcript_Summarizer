import { z } from "zod";

export type BuildConfig = z.infer<typeof buildConfigSchema>;

export type BuildParameters = BuildConfig["Parameters"];

export const buildConfigSchema = z.object({
  AWSAccountID: z.string().min(1),
  AWSProfileName: z.string().min(1),
  AWSProfileRegion: z.string().min(1),
  Environment: z.string().min(1),
  LogLevel: z.string().min(1),
  Parameters: z.object({}),
});
