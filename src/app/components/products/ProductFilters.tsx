"use client";

import { Product } from "@/app/types/product";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

type Props = {
    productsOnLoad: Product[];
    updateGrid: Dispatch<SetStateAction<Product[]>>;
};

export default function ProductFilters({ productsOnLoad, updateGrid }: Props) {
    const [selectedCollection, setSelectedCollection] = useState<string>("All");
    const [sortOrder, setSortOrder] = useState<string>("none");

    const collections = useMemo(() => {
        const allCollections = productsOnLoad.flatMap(
            (product) => product.collections
        );
        return Array.from(new Set(allCollections)).sort();
    }, [productsOnLoad]);

    useEffect(() => {
        const filtered = applyFilters(productsOnLoad, selectedCollection);
        updateGrid(filtered);
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

    return (
        <div className="mt-6">
            <label>
                Order By:
                <select
                    name="orderBy"
                    onChange={(e) => {
                        const value = e.target.value;

                        // if (value === "none") {
                        //     updateGrid(products);
                        // } else if (value === "price-h-to-l") {
                        //     const filtered = [...products].sort((a, b) => );
                        // }
                    }}
                >
                    <option value="none">None</option>
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
