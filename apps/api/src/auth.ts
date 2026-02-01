import { createAuth } from "@habbit-tracker/auth";
import { TRUSTED_ORIGINS } from "./config";

// Initialize auth with trusted origins
export const auth = createAuth({
    trustedOrigins: TRUSTED_ORIGINS,
  })