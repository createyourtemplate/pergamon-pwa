import { CategoryTreeItem, RobotsStaticPages, SessionResult, Setting } from "@plentymarkets/shop-api";

export type InitResponse = {
    session: SessionResult;
    categories: CategoryTreeItem[];
    robots: RobotsStaticPages;
    settings: Setting[];
}