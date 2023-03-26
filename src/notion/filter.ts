import { isFullBlock } from "@notionhq/client";
import { PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export function filterBlockChildren(blocks: PartialBlockObjectResponse[]) {
    return blocks.filter((x) => isFullBlock(x) && x.type != "child_page");
}