import type { Block } from '@plentymarkets/shop-api';

export type VerticalCarouselStructureProps = {
  name: string;
  type: string;
  content: Block[];
  index: number;
  meta: {
    uuid: string;
  };
};