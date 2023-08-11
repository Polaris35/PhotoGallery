export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            DEV_PORT: number;
            ENV: 'test' | 'dev' | 'prod';
            JWT_SECRET:string;
        }
    }
}
