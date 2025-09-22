import { BasketItem, CartItem, Data, InitResult } from '@plentymarkets/shop-api';
import { defineEventHandler } from 'h3';
import { useRequest } from '~/server/utils/useRequest';

const getMappedCartItems = (basketItems: BasketItem[]): CartItem[] => {
    return basketItems.map((basketItem: BasketItem) => {
      return {
        ...basketItem,
        variation: basketItem.variation.data,
      };
    });
  }
  

export default defineEventHandler(async (event) => {
    const response = await useRequest().get<Data<any>>(event, '/rest/storefront/init');
    const session = response.data.session;
    const categories = response.data.categories;
    const robots = response.data.robots;
    const settings = response.data.settings;

    const cartItems: BasketItem[] = session.cartItems;
    const cart = { ...session.cart, items: getMappedCartItems(cartItems) };

    return {
        data: {
            session: {
                user:
                    session.customer ||
                    (session.guest
                        ? { guestMail: session.guest }
                        : null),
                basket: cart,
            },
            categories,
            robots,
            settings,
        },
    } as Data<InitResult>;
});