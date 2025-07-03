"use client";

import { Product } from "@/app/types/product";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

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
        <div className="mt-6">
            <label>
                Order By:
                <select
                    name="orderBy"
                    onChange={(e) => {
                        setSortOrder(e.target.value);
                    }}
                >
                    <option value="price-h-to-l">Price: High to low</option>
                    <option value="price-l-to-h">Price: Low to High</option>
                </select>
            </label>
            <fieldset>
                <legend>Collection</legend>
                <label>
                    All
                    <input
                        type="radio"
                        name="collection"
                        value="All"
                        checked={"All" === selectedCollection}
                        onChange={() => setSelectedCollection("All")}
                    />
                </label>
                {collections.map((collection) => {
                    return (
                        <label key={collection}>
                            {collection}
                            <input
                                type="radio"
                                name="collection"
                                value={collection}
                                checked={collection === selectedCollection}
                                onChange={() =>
                                    setSelectedCollection(collection)
                                }
                            />
                        </label>
                    );
                })}
            </fieldset>
        </div>
    );
}
