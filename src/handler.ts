import { Client } from "@notionhq/client";
import { Notion } from "./config";

export default async function (config: Notion): Promise<void> {
    const notion = new Client({
        auth: config.apiToken,
    });

    try {
        const blocks = await notion.blocks.children.list({ block_id: 'bc6d534bf3774d258c957557b115c0ae' });

        for (const block of blocks.results) {
            console.info(block);
        }

        notion.pages.create({
            parent: {
                page_id: 'bc6d534bf3774d258c957557b115c0ae',
            },
            properties: [
                {

                }
            ],
        });
    } catch (err: any) {
        console.error(err);
    }


    return Promise.resolve();
}