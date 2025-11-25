import { createResolver, defineNuxtModule, extendPages, addComponent } from "nuxt/kit";

export default defineNuxtModule({
    async setup(_, nuxt) {
        const {resolve} = createResolver(import.meta.url);
        
        nuxt.hook('app:resolve', (app) => {
            // default
            app.layouts['default'] = {
                name: 'default',
                file: resolve('./runtime/layouts/defaultLayout.vue'),
            };
        });

        await addComponent({
            name: 'SelectedFilters',
            filePath: resolve('./runtime/components/Filter/SelectedFilters.vue'),
        });

        await addComponent({
            name: 'SelectedFilter',
            filePath: resolve('./runtime/components/Filter/SelectedFilter.vue'),
        });

        /**
        * extend i18n Cormorant Garamond
        */
        nuxt.hook('i18n:registerModule', (register) => {
            register({
                langDir: resolve('./runtime/lang'),
                locales: [
                    {
                        code: 'en',
                        file: 'en.json',
                    },
                    {
                        code: 'de',
                        file: 'de.json',
                    },
                ]
            });
        });

        nuxt.hook('components:extend', (components) => {

            const narrowContainer = components.find((c) => c.pascalName === 'NarrowContainer');
            if (narrowContainer) {
                narrowContainer.filePath = resolve('./runtime/components/NarrowContainer/NarrowContainer.vue');
            }

            const megaMenu = components.find((c) => c.pascalName === 'MegaMenu');
            if (megaMenu) {
                megaMenu.filePath = resolve('./runtime/components/MegaMenu/MegaMenu.vue');
            }
            
            const header = components.find((c) => c.pascalName === 'UiHeader');
            if (header) {
                header.filePath = resolve('./runtime/components/ui/Header/Header.vue');
            }

            const productCard = components.find((c) => c.pascalName === 'UiProductCard');
            if (productCard) {
                productCard.filePath = resolve('./runtime/components/ui/ProductCard/ProductCard.vue');
            }

            const purchaseCard = components.find((c) => c.pascalName === 'UiPurchaseCard');
            if (purchaseCard) {
                purchaseCard.filePath = resolve('./runtime/components/ui/PurchaseCard/PurchaseCard.vue');
            }

            const price = components.find((c) => c.pascalName === 'Price');
            if (price) {
                price.filePath = resolve('./runtime/components/Price/Price.vue');
            }

            const productAccordion = components.find((c) => c.pascalName === 'ProductAccordion');
            if (productAccordion) {
                productAccordion.filePath = resolve('./runtime/components/ProductAccordion/ProductAccordion.vue');
            }

            const accordionItem = components.find((c) => c.pascalName === 'UiAccordionItem');
            if (accordionItem) {
                accordionItem.filePath = resolve('./runtime/components/ui/AccordionItem/AccordionItem.vue');
            }

            // WishListButton
            const wishlistButton = components.find((c) => c.pascalName === 'WishlistButton');
            if (wishlistButton) {
                wishlistButton.filePath = resolve('./runtime/components/WishlistButton/WishlistButton.vue');
            }

            const pagination = components.find((c) => c.pascalName === 'UiPagination');
            if (pagination) {
                pagination.filePath = resolve('./runtime/components/ui/Pagination/Pagination.vue');
            }
        });

        extendPages((pages: NuxtPage[]) => {

            // Homepage
            const overrideHomePage = pages.find((p) => p.name === 'index');
            if (overrideHomePage) {
                overrideHomePage.file = resolve('./runtime/pages/homepage/indexCyt.vue');
            }

            // ProductPage
            const productPage = pages.find((p) => p.name === 'product-slug');
            if (productPage) {
                productPage.file = resolve('./runtime/pages/product/[slug].vue');
            }
        });
    }
});