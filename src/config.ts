export interface Env {
    API_TOKEN: string;
}

export interface Notion {
    apiToken: string;
}

export function fromEnv(env: Env): Notion {
    return {
        apiToken: env.API_TOKEN,
    }
}