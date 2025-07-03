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
                            vendor
                            featuredImage {
                                url
                                altText
                                width
                                height
                            }
                            handle
                            collections(first: 3) {
                                edges {
                                    node {
                                        title
                                    }
                                }
                            }
                            variants(first: 1) {
                                edges {
                                    node {
                                        price {
                                            amount
                                        }
                                        selectedOptions {
                                            name
                                            value
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
                vendor: node.vendor ?? "N/A",
                price: node.variants?.edges?.[0]?.node?.price?.amount ?? "0.00",
                imageUrl: node.featuredImage?.url ?? "",
                imageAlt: node.featuredImage?.altText ?? node.title,
                imageWidth: node.featuredImage?.width ?? 0,
                imageHeight: node.featuredImage?.height ?? 0,
                handle: node.handle,
                collections: node.collections?.edges.map(({ node }) => {
                    return node.title;
                }) ?? ["None"],
                color: node.variants?.edges?.[0]?.node?.selectedOptions
                    ?.filter(({ name }) => name === "Color")
                    .flatMap(({ value }) => value) ?? ["N/A"],
            };
        });

        return products;
    } catch (error) {
        console.error("Failed to fetch product data: ", error);
        throw error;
    }
}
