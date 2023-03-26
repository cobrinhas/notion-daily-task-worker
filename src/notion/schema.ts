import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type RecursiveBlock = {
    id: string,
    children: Array<BlockObjectResponse>,
};

export type ResultBlock = {
    id: string;
    type: string;
};

export type UpdateBlockChildrenResponse = {
    results: Array<ResultBlock>;
};