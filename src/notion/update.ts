import { Client } from "@notionhq/client";
import { CreatePageResponse } from "@notionhq/client/build/src/api-endpoints";
import { filterBlockChildren } from "./filter";
import { RecursiveBlock, UpdateBlockChildrenResponse } from "./schema";

export function shallowPageClone(pageId: string, client: Client): Promise<CreatePageResponse> {
    return client.pages.create(
        {
            parent: {
                page_id: pageId,
            },
            properties: {
                title: [
                    {
                        text: {
                            content: new Date().toLocaleDateString(new Intl.Locale("pt")),
                        }
                    }
                ]
            },

        }
    );
}

export async function recursiveBlockUpdate(apiToken: string, client: Client, block: RecursiveBlock): Promise<Response> {
    const resp = await fetch(
        `https://api.notion.com/v1/blocks/${block.id}/children`,
        {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                "Content-Type": "application/json",
                "Notion-Version": "2022-06-28"
            },
            body: JSON.stringify(
                {
                    children: block.children,
                }
            ),
        }
    );

    if (resp.status === 200) {
        const updateBlockChildrenResponse = await resp.json<UpdateBlockChildrenResponse>();

        for (let i = 0; i < block.children.length; i++) {
            const childBlock = block.children[i];

            if (childBlock.has_children) {
                const childBlockId = childBlock.id;
                const updateChildBlockId = updateBlockChildrenResponse.results[i].id;
                const childBlockChildrenBlocks = filterBlockChildren((await client.blocks.children.list({ block_id: childBlockId })).results);


                const childRecursiveBlock = <RecursiveBlock>{
                    id: updateChildBlockId,
                    children: childBlockChildrenBlocks,
                };

                await recursiveBlockUpdate(apiToken, client, childRecursiveBlock);
            }
        }
    }

    return resp;
}