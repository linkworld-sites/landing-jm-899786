import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build/serve to an overridable dist dir so a build can target a temp dir
  // (.next-build) while the live runner keeps serving .next — the no-downtime
  // build-to-temp + atomic swap publish. Do NOT remove.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Runners may serve an isolated dev-mode preview behind *.run.linkworld.ai
  // (nginx + socat); Next 15 blocks cross-origin /_next/* (HMR) without this.
  allowedDevOrigins: ["*.run.linkworld.ai"],
  // Single worker for static generation: the sandbox's pids cgroup limit is
  // low enough that the default multi-worker fork-out during "Generating
  // static pages" can hit it and crash the build with spawn EAGAIN.
  experimental: { cpus: 1 },
};

export default nextConfig;
