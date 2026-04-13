/** @type {import('next').NextConfig} */
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGithubActions = process.env.GITHUB_ACTIONS || false;

const nextConfig = {
  output: "export",
  basePath: isGithubActions && repoName ? `/${repoName}` : "",
  assetPrefix: isGithubActions && repoName ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
