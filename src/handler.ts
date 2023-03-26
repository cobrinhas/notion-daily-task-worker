import { Client } from "@notionhq/client";
import { Notion } from "./config";
import { filterBlockChildren, RecursiveBlock, recursiveBlockUpdate, shallowPageClone } from "./notion";

export default async function (config: Notion): Promise<void> {
    const client = new Client({
        auth: config.apiToken,
    });

    try {
        const blocks = filterBlockChildren((await client.blocks.children.list({ block_id: config.parentPageId })).results);
        const page = await shallowPageClone(config.parentPageId, client);

        const recursiveBlock = <RecursiveBlock>{
            id: page.id,
            children: blocks,
        };

        const recursiveBlockUpdateResponse = await recursiveBlockUpdate(config.apiToken, client, recursiveBlock);

        console.info(`recursiveBlockUpdate status: ${recursiveBlockUpdateResponse.status}`);
    } catch (err: any) {
        console.error(err);
    }

    return Promise.resolve();
}