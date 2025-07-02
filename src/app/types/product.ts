export type Product = {
    id: string;
    title: string;
    price: string;
    imageUrl: string;
    imageAlt: string;
    handle: string;
    collections: string[];
    colors: string[];
};

export type ProductQueryResponse = {
    products: {
        edges: {
            node: {
                id: string;
                title: string;
                description: string;
                featuredImage?: {
                    url: string;
                    altText: string;
                };
                handle: string;
                collections?: {
                    edges: {
                        node: {
                            title: string;
                        };
                    }[];
                };
                options: {
                    name: string;
                    optionValues: { name: string }[];
                }[];
                variants?: {
                    edges: {
                        node: {
                            price: {
                                amount: string;
                            };
                        };
                    }[];
                };
            };
        }[];
    };
};
