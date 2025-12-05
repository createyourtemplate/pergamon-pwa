export type ProductListProps = {
  type: "cross_selling" | "last_seen";
  itemId?: number;
  crossSellingRelation?: 'Accessory' | 'ReplacementPart' | 'Similar' | 'Bundle';
  cacheKey?: string;
};