export const ENV: {
    BASE_URL: string;
    NODE_ENV: string;
    REDUX_PERSIST_SECRET: string;
    MAINTENANCE_MODE: string;
} = {
    BASE_URL: import.meta.env.VITE_NODE_ENV === "development" ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL,
    NODE_ENV: import.meta.env.VITE_NODE_ENV,
    REDUX_PERSIST_SECRET: import.meta.env.VITE_REDUX_PERSIST_SECRET,
    MAINTENANCE_MODE: import.meta.env.VITE_MAINTENANCE_MODE,
};