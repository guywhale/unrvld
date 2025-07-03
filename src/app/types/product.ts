export type Product = {
    id: string;
    title: string;
    vendor: string;
    price: string;
    imageUrl: string;
    imageAlt: string;
    imageWidth: number;
    imageHeight: number;
    handle: string;
    collections: string[];
    color: string[] | undefined;
};

export type ProductQueryResponse = {
    products: {
        edges: {
            node: {
                id: string;
                title: string;
                vendor: string;
                featuredImage?: {
                    url: string;
                    altText: string;
                    width: number;
                    height: number;
                };
                handle: string;
                collections?: {
                    edges: {
                        node: {
                            title: string;
                        };
                    }[];
                };
                variants?: {
                    edges: {
                        node: {
                            price: {
                                amount: string;
                            };
                            selectedOptions: {
                                name: string;
                                value: string;
                            }[];
                        };
                    }[];
                };
            };
        }[];
    };
};
