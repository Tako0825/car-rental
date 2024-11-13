/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_DOWNLOAD_URL: string
    VITE_ACCESS_KEY: string
    VITE_SECRET_KEY: string
    VITE_API_URL: string
    VITE_UPLOAD_URL: string
    VITE_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
