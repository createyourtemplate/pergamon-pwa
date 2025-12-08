import { createResolver, defineNuxtModule, extendPages, addComponent, addPlugin } from "nuxt/kit";

export default defineNuxtModule({
    async setup(options, nuxt) {
        const {resolve} = createResolver(import.meta.url);

        // H1 Font-Styling Plugin hinzufügen
        addPlugin(resolve('./runtime/plugins/h1-font-styling.client.ts'));

        nuxt.options.app.head = nuxt.options.app.head || {};
        nuxt.options.app.head.link = nuxt.options.app.head.link || [];
        nuxt.options.app.head.link.push(
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
            { 
                rel: 'stylesheet', 
                href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Figtree:ital,wght@0,300..900;1,300..900&display=swap' 
            }
        );

        
        nuxt.hook("tailwindcss:config", (config) => {
            // Extend Container
            if (!config.theme) config.theme = {};
            if (!config.theme.extend) config.theme.extend = {};

            // Colors example
            if (!config.theme.extend.colors) config.theme.extend.colors = {};
            config.theme.extend.colors["pergamon"] = { 
                "gray": "#bebebe",
                "light-gray": "#f7f7f7"
             };

            // Border radius override
            config.theme.extend.borderRadius = {
                none: "0",
                sm: "0",
                DEFAULT: "0",
                md: "0",
                lg: "0",
                xl: "0",
                "2xl": "0",
                "3xl": "0",
            };
            config.theme.extend.fontSize = {
                "7xl": ["72px", "1rem"],
            };
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
                        file: 'de.json'
                    },
                ]
            });
        });
        
        nuxt.hook('app:resolve', (app) => {

            app.layouts['simplifiedHeaderAndFooter'] = {
                name: 'simplified-header-and-footer',
                file: resolve('./runtime/layouts/simplifiedHeaderAndFooter.vue'),
            };

            app.layouts['default'] = {
                name: 'default',
                file: resolve('./runtime/layouts/default.vue'),
            };

            app.layouts['order'] = {
                name: 'order',
                file: resolve('./runtime/layouts/order.vue'),
            };

            app.layouts['auth'] = {
                name: 'auth',
                file: resolve('./runtime/layouts/auth.vue'),
            };
        });

        await addComponent({
            name: 'MultiGridIcon',
            filePath: resolve('./runtime/components/ui/Icons/MultiGridIcon.vue'),
            global: true,
        });
        
        await addComponent({
            name: 'GridIcon',
            filePath: resolve('./runtime/components/ui/Icons/GridIcon.vue'),
            global: true,
        });

        await addComponent({
            name: 'RectIcon',
            filePath: resolve('./runtime/components/ui/Icons/RectIcon.vue'),
            global: true,
        });

        await addComponent({
            name: 'SelectedFilters',
            filePath: resolve('./runtime/components/Filter/SelectedFilters.vue'),
            global: true,
        });

        await addComponent({
            name: 'SelectedFilter',
            filePath: resolve('./runtime/components/Filter/SelectedFilter.vue'),
            global: true,
        });

        await addComponent({
            name: 'ItemShare',
            filePath: resolve('./runtime/components/ItemShare/ItemShare.vue'),
            global: true,
        });

        await addComponent({
            name: 'Tabs',
            filePath: resolve('./runtime/components/blocks/Tabs/Tabs.vue'),
            global: true,
        });

        await addComponent({
            name: 'ProductReviews',
            filePath: resolve('./runtime/components/ProductReviews/ProductReviews.vue'),
            global: true,
        });

        await addComponent({
            name: 'ProductList',
            filePath: resolve('./runtime/components/ProductList/ProductList.vue'),
            global: true,
        });

        extendPages((pages: NuxtPage[]) => {

            // homepage
            const homePage = pages.find((p) => p.name === 'index');
            if (homePage) {
                homePage.file = resolve('./runtime/pages/homepage/index.vue');
            }
            // ProductPage
            const productPage = pages.find((p) => p.name === 'product-slug');
            if (productPage) {
                productPage.file = resolve('./runtime/pages/product/[slug].vue');
            }
            
            // ProductPage
            const generalPage = pages.find((p) => p.name === 'slug');
            if (generalPage) {
                generalPage.file = resolve('./runtime/pages/[...slug].vue');
            }
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

            const simplifiedHeader = components.find((c) => c.pascalName === 'UiSimplifiedHeader');
            if (simplifiedHeader) {
                simplifiedHeader.filePath = resolve('./runtime/components/ui/SimplifiedHeader.vue');
            }

            const footer = components.find((c) => c.pascalName === 'UiFooter');
            if (footer) {
                footer.filePath = resolve('./runtime/components/ui/Footer/Footer.vue');
            }

            const blockFooter = components.find((c) => c.pascalName === 'BlocksFooter');
            if (blockFooter) {
                blockFooter.filePath = resolve('./runtime/components/blocks/Footer/Footer.vue');
            }

            const carousel = components.find((c) => c.pascalName === 'Carousel');
            if (carousel) {
                carousel.filePath = resolve('./runtime/components/blocks/structure/Carousel/Carousel.vue');
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

            const categorySidebar = components.find((c) => c.pascalName === 'CategorySidebar');
            if (categorySidebar) {
                categorySidebar.filePath = resolve('./runtime/components/CategorySidebar/CategorySidebar.vue');
            }

            const categoryFiltersSort = components.find((c) => c.pascalName === 'CategoryFiltersSort');
            if (categoryFiltersSort) {
                categoryFiltersSort.filePath = resolve('./runtime/components/CategoryFilters/Sort.vue');
            }

            const categoryFiltersSortSections = components.find((c) => c.pascalName === 'CategoryFiltersSortSections');
            if (categoryFiltersSortSections) {
                categoryFiltersSortSections.filePath = resolve('./runtime/components/CategoryFilters/SortSections.vue');
            }

            const categorySorting = components.find((c) => c.pascalName === 'CategorySorting');
            if (categorySorting) {
                categorySorting.filePath = resolve('./runtime/components/CategorySorting/CategorySorting.vue');
            }

            const categoryData = components.find((c) => c.pascalName === 'CategoryData');
            if (categoryData) {
                categoryData.filePath = resolve('./runtime/components/blocks/CategoryData/CategoryData.vue');
            }

            const sortFilter = components.find((c) => c.pascalName === 'SortFilter');
            if (sortFilter) {
                sortFilter.filePath = resolve('./runtime/components/blocks/SortFilter/SortFilter.vue');
            }

            const pagination = components.find((c) => c.pascalName === 'UiPagination');
            if (pagination) {
                pagination.filePath = resolve('./runtime/components/ui/Pagination/Pagination.vue');
            }
        });
    }
});