"use client";

import { Product } from "../types/product";
import SectionMeta from "./SectionMeta";

type Props = {
    productsOnLoad: Product[];
};
export default function Products({ productsOnLoad }: Props) {
    console.log(productsOnLoad);
    return (
        <section id="products">
            <div className="flex">
                <div>
                    <SectionMeta
                        tagline={"Spring Summer 24"}
                        title={"Explore the Range"}
                    />
                </div>
            </div>
        </section>
    );
}
