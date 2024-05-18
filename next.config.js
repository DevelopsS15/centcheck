import { env } from "./src/env.js";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        hostname: "flowbite.com",
      },
      {
        hostname: "ptcbwcoovdzlkuettdbm.supabase.co",
      },
      {
        hostname: "encrypted-tbn0.gstatic.com",
      },
    ],
  },
};

export default config;
