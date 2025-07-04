"use client";

import { Product } from "@/app/types/product";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import ProductFilterRadio from "./ProductFilterRadio";

type Props = {
    productsOnLoad: Product[];
    updateGrid: Dispatch<SetStateAction<Product[]>>;
};

export default function ProductFilters({ productsOnLoad, updateGrid }: Props) {
    const [selectedCollection, setSelectedCollection] = useState<string>("All");
    const [sortOrder, setSortOrder] = useState<string>("price-h-to-l");

    const collections = useMemo(() => {
        const allCollections = productsOnLoad.flatMap(
            (product) => product.collections
        );
        return Array.from(new Set(allCollections)).sort();
    }, [productsOnLoad]);

    useEffect(() => {
        const filtered = applyFilters(productsOnLoad, selectedCollection);
        const sorted = applySortOrder(filtered, sortOrder);
        updateGrid(sorted);
    }, [productsOnLoad, selectedCollection, sortOrder, updateGrid]);

    function applyFilters(products: Product[], selectedCollection: string) {
        return products.filter((product) => {
            const collectionToMatch =
                selectedCollection !== "All"
                    ? product.collections.includes(selectedCollection)
                    : true;

            return collectionToMatch;
        });
    }

    function applySortOrder(products: Product[], order: string) {
        const sorted = [...products];

        if (order === "price-h-to-l") {
            return sorted.sort((a, b) => {
                return parseFloat(b.price) - parseFloat(a.price);
            });
        } else if (order === "price-l-to-h") {
            return sorted.sort((a, b) => {
                return parseFloat(a.price) - parseFloat(b.price);
            });
        } else {
            return sorted;
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-4 mt-4">
            <label className="relative flex flex-col w-fit">
                <span className="mb-2 font-bold text-xs md:text-sm leading-3 md:leading-3.5 tracking-[0.14em] uppercase">
                    Order By:
                </span>
                <select
                    className="py-2 pr-8 pl-3 border border-neutral-300 appearance-none"
                    name="orderBy"
                    onChange={(e) => {
                        setSortOrder(e.target.value);
                    }}
                >
                    <option value="price-h-to-l">Price: High to Low</option>
                    <option value="price-l-to-h">Price: Low to High</option>
                </select>{" "}
                <svg
                    className="absolute right-1.5 bottom-2"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000"
                >
                    <path d="M480-360 280-560h400L480-360Z" />
                </svg>
            </label>
            <div role="group" aria-labelledby="collection-label">
                <h2
                    id="collection-label"
                    className="mb-2 font-bold text-xs md:text-sm leading-3 md:leading-3.5 tracking-[0.14em] uppercase"
                >
                    Collection:
                </h2>
                <div className="overflow-x-auto touch-auto">
                    <div className="flex gap-2 min-w-max">
                        <ProductFilterRadio
                            collection="All"
                            selectedCollection={selectedCollection}
                            setSelectedCollection={setSelectedCollection}
                        />
                        {collections.map((collection) => {
                            return (
                                <ProductFilterRadio
                                    key={collection}
                                    collection={collection}
                                    selectedCollection={selectedCollection}
                                    setSelectedCollection={
                                        setSelectedCollection
                                    }
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
