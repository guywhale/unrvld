import { gql, request } from "graphql-request";
import { Product, ProductQueryResponse } from "../types/product";

export default async function fetchProducts(): Promise<Product[]> {
    try {
        const query = gql`
            {
                products(first: 12) {
                    edges {
                        node {
                            id
                            title
                            description
                            priceRange {
                                maxVariantPrice {
                                    amount
                                }
                            }
                            featuredImage {
                                url
                                altText
                            }
                            handle
                            collections(first: 3) {
                                edges {
                                    node {
                                        title
                                    }
                                }
                            }
                            options {
                                name
                                optionValues {
                                    name
                                }
                            }
                            variants(first: 1) {
                                edges {
                                    node {
                                        price {
                                            amount
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;
        const response = await request<ProductQueryResponse>(
            "https://mock.shop/api",
            query
        );

        if (!response) {
            throw new Error(`Something went wrong with network request.`);
        }

        const products = response.products?.edges?.map(({ node }) => {
            return {
                id: node.id,
                title: node.title,
                price: node.variants?.edges?.[0]?.node?.price?.amount ?? "0.00",
                description: node.description,
                imageUrl: node.featuredImage?.url ?? "",
                imageAlt: node.featuredImage?.altText ?? "",
                handle: node.handle,
                collections: node.collections?.edges.map(({ node }) => {
                    return node.title;
                }) ?? ["None"],
                colors: node.options
                    .filter(
                        (option: { name: string }) => option.name === "Color"
                    )
                    .flatMap(({ optionValues }) => {
                        return optionValues.map(
                            (value: { name: string }) => value.name
                        );
                    }) ?? ["None"],
            };
        });

        return products;
    } catch (error) {
        console.error("Failed to fetch product data: ", error);
        throw error;
    }
}
