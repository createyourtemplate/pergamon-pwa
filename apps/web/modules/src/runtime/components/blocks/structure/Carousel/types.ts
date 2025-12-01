import type { Block } from '@plentymarkets/shop-api';

export type CarouselStructureProps = {
  name: string;
  type: string;
  content: Block[];
  configuration: {
    direction: 'horizontal' | 'vertical';
    fullHeight: boolean;
    controls: {
      color: string;
      displayArrows: boolean;
    };
  };
  index: number;
  meta: {
    uuid: string;
  };
};
