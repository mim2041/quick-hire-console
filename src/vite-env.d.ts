/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_API_BASE_URL_LOCAL: string;
    readonly VITE_NODE_ENV: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_DEFAULT_LOCALE: string;
    readonly VITE_ENABLE_MOCK: string;
    readonly VITE_AUTH_TOKEN_KEY: string;
    readonly VITE_REDUX_PERSIST_SECRET: string;
    readonly VITE_REDUX_PERSIST_SECRET_KEY: string;
    readonly VITE_MAINTENANCE_MODE: string;
    readonly VITE_MAINTENANCE_CHECK_INTERVAL: string;
    readonly VITE_ENABLE_ANALYTICS: string;
    // add more env variables here if needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
