import { defineConfig } from "vite";

const isProd = process.env.NODE_ENV === "production";
const repositoryName = process.env.REPOSITORY_NAME;

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: true,
    },
    base: isProd ? `/${repositoryName}` : "/",
});
