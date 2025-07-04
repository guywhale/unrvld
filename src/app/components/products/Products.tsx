"use client";

import { useState } from "react";
import { Product } from "../../types/product";
import SectionHeader from "../SectionHeader";
import ProductFilters from "./ProductFilters";
import ProductCTACard from "./ProductCTACard";

type Props = {
    productsOnLoad: Product[];
};

export default function Products({ productsOnLoad }: Props) {
    const [products, setProducts] = useState<Product[]>(productsOnLoad);

    return (
        <section aria-label="Explore the Range">
            <div className="pt-16 pb-10 pl-6.5 lg:flex overflow-hidden">
                <SectionHeader
                    tagline={"Spring Summer 24"}
                    title={"Explore the Range"}
                />
                <ProductFilters
                    productsOnLoad={productsOnLoad}
                    updateGrid={setProducts}
                />
            </div>
            <div
                aria-label="Product List"
                className="grid items-stretch grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-[1px] gap-px bg-neutral-200"
            >
                {products.map((product: Product, index) => {
                    return (
                        <ProductCTACard
                            key={product.id}
                            product={product}
                            isAboveFold={index >= 0 && index <= 3}
                        />
                    );
                })}
            </div>
        </section>
    );
}
