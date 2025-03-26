/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  output: "export", // 정적 HTML로 export 하도록 설정
};

module.exports = nextConfig;
