export interface Env {
    API_TOKEN: string;
    PARENT_PAGE_ID: string;
}

export interface Notion {
    apiToken: string;
    parentPageId: string;
}

export function fromEnv(env: Env): Notion {
    return {
        apiToken: env.API_TOKEN,
        parentPageId: env.PARENT_PAGE_ID,
    };
}