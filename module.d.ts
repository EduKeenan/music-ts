declare namespace NodeJS {
    export interface ProcessEnv {
        DB_HOST: string,
        DB_PASSWORD: string,
        DB_USER: string,
        DB_SCHEMA: string,
        DB_PORT: string
    }
  }

declare namespace Express {
    export interface Request {
        id_usuario: string,
        adm: boolean
    }
  }